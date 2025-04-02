apt-get install nodejs
apt-get install npm
curl -fsSL https://get.pnpm.io/install.sh | sh -
sudo systemctl daemon-reload
sudo systemctl enable spamiabot.service
sudo systemctl start spamiabot.service
sudo systemctl status spamiabot.service
apt-get install nginx
cp ./spamiabot.service /etc/systemd/system/
cp ./default /etc/nginx/sites-available/default
systemctl restart nginx