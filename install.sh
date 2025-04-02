cp ./spamiabot.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable spamiabot.service
sudo systemctl start spamiabot.service
sudo systemctl status spamiabot.service