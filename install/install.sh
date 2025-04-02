sudo systemctl daemon-reload
sudo systemctl enable spamiabot.service
sudo systemctl start spamiabot.service
sudo systemctl status spamiabot.service
apt-get install nginx
cp ./spamiabot.service /etc/systemd/system/
cp ./default /etc/nginx/sites-available/default
systemctl restart nginx