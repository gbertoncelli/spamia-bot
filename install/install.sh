cp ./spamiabot.service /etc/systemd/system/
cp ./default /etc/nginx/sites-available/default
sudo systemctl daemon-reload
sudo systemctl enable spamiabot.service
sudo systemctl start spamiabot.service
sudo systemctl status spamiabot.service