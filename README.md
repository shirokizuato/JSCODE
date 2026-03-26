<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Controller Interface</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <header class="method-header">
            <button onclick="handleRequest('GET')">GET</button>
            <button onclick="handleRequest('POST')">POST</button>
            <button onclick="handleRequest('PUT')">PUT</button>
            <button onclick="handleRequest('PATCH')">PATCH</button>
            <button onclick="handleRequest('DELETE')">DELETE</button>
        </header>

        <main class="content-body">
            <div class="input-section">
                <div class="field">
                    <label>Id</label>
                    <input type="text" id="userId" placeholder="2">
                </div>
                <div class="field">
                    <label>Name</label>
                    <input type="text" id="name">
                </div>
                <div class="field">
                    <label>Username</label>
                    <input type="text" id="username">
                </div>
                <div class="field">
                    <label>Email</label>
                    <input type="email" id="email">
                </div>
                <div class="field">
                    <label>Address</label>
                    <input type="text" id="address">
                </div>
                
                <button class="update-btn" onclick="handleRequest('UPDATE')">Update</button>
            </div>

            <div class="display-section">
                <div id="output">Response data will appear here...</div>
            </div>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>
