<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8faff;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid #eef2f7;
        }
        .header {
            background-color: #6366f1;
            color: #ffffff;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.02em;
        }
        .content {
            padding: 40px;
        }
        .field {
            margin-bottom: 25px;
        }
        .label {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            color: #6366f1;
            letter-spacing: 0.1em;
            margin-bottom: 5px;
            display: block;
        }
        .value {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }
        .message-box {
            background-color: #f8faff;
            padding: 25px;
            border-radius: 15px;
            border: 1px solid #eef2f7;
            margin-top: 10px;
            font-size: 15px;
            color: #475569;
            white-space: pre-line;
        }
        .footer {
            padding: 30px;
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
            background-color: #fcfdfe;
            border-top: 1px solid #eef2f7;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Portfolio Inquiry</h1>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">From</span>
                <span class="value">{{ $data['first_name'] }} {{ $data['last_name'] }} ({{ $data['email'] }})</span>
            </div>
            
            <div class="field">
                <span class="label">Subject</span>
                <span class="value">{{ $data['subject'] }}</span>
            </div>
            
            <div class="field">
                <span class="label">Message</span>
                <div class="message-box">
                    {{ $data['message'] }}
                </div>
            </div>
        </div>
        <div class="footer">
            Sent from your portfolio contact form.
        </div>
    </div>
</body>
</html>
