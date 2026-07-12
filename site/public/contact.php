<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Honeypot — must stay empty (matches React field name "website")
if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Submission blocked.']);
    exit;
}

$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Enter a valid email.']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$projectType = trim((string) ($_POST['projectType'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

$to = 'info@lisenbart.com';
$subject = $projectType !== ''
    ? 'LISENBART — ' . $projectType
    : 'LISENBART — New project inquiry';

$bodyLines = [
    $message !== '' ? $message : '(no message)',
    '',
    '---',
    $name !== '' ? 'Name: ' . $name : 'Name: (not provided)',
    'Email: ' . $email,
    $projectType !== '' ? 'Project type: ' . $projectType : 'Project type: (not provided)',
];
$body = implode("\n", $bodyLines);

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: LISENBART Website <noreply@lisenbart.com>',
    'Reply-To: ' . $email,
]);

$sent = @mail($to, $encodedSubject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
    exit;
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'message' => 'Could not send your message. Please email info@lisenbart.com directly.',
]);
