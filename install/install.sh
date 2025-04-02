apt-get install nodejs
apt-get install npm
curl -fsSL https://get.pnpm.io/install.sh | sh -

cp ./spamiabot.service /etc/systemd/system/
sudo systemctl enable spamiabot.service

apt-get install nginx
cp ./default /etc/nginx/sites-available/default
sudo systemctl daemon-reload

systemctl restart nginx
systemctl restart spamiabot
sudo systemctl status spamiabot.service

sudo useradd node