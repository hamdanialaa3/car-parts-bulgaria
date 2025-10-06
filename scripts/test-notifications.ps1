# VS Code Notification Test Script
Write-Host "Testing VS Code Notifications..." -ForegroundColor Cyan

# Test system notification with sound
Add-Type -AssemblyName System.Windows.Forms
$notification = New-Object System.Windows.Forms.NotifyIcon
$notification.Icon = [System.Drawing.SystemIcons]::Information
$notification.BalloonTipIcon = "Info"
$notification.BalloonTipText = "GitHub Copilot is calling you!"
$notification.BalloonTipTitle = "VS Code Notification"
$notification.Visible = $true
$notification.ShowBalloonTip(5000)

# Play system sound
[System.Media.SystemSounds]::Asterisk.Play()

Write-Host "Notification sent! Check your system tray." -ForegroundColor Green
Write-Host "Sound notification played." -ForegroundColor Yellow

# Clean up
Start-Sleep -Seconds 6
$notification.Dispose()

Write-Host "To enable more notifications in VS Code:" -ForegroundColor Magenta
Write-Host "1. Open VS Code Settings" -ForegroundColor White
Write-Host "2. Search for notifications" -ForegroundColor White
Write-Host "3. Search for audio cues" -ForegroundColor White
Write-Host "4. Enable all sound options" -ForegroundColor White