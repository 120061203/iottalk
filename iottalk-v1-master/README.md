# IoTtalk 1.0

## System Requirement
- Python 3.5.1 +
- (optional) MySQL server
- (MusicBox) Nodejs 
- (MusicBox) npm

All commands below assume your OS is Ubuntu.  
Besides, IoTtalk needs ports `80`, `5566`, `7788`, `8000`, and `9999`, make sure that you don't have web server or anything else already run on these ports.  




## Setup IoTtalk 1.0
1) Update system packages  
```
sudo apt-get -y update
sudo apt-get -y upgrade
sudo apt-get -y autoremove
```


2) Install dependent system packages  
```
sudo apt-get -y install screen python3 python3-pip libsqlite3-dev libssl-dev openssl
sudo apt-get install mailutils
sudo apt-get install nodejs    #for MusicBox
sudo apt-get install npm       #for MusicBox
```


3) Enter to directory where your IoTtalk server located in  


4) Install and update dependent python3 packages  
```
sudo -H pip3 install --upgrade pip
sudo -H pip3 install setuptools
sudo -H pip3 install -r requirements.txt
sudo -H pip3 install --upgrade requests
```

5) Start up the server  
```
sudo -H ./setup/startup.sh
```




## Auto start IoTtalk 1.0 at reboot
Because some command in `setup/startup.sh` need root privilege, you need `sudo crontab -e` to edit root's crontab.  
Add one line at the end:
```
@reboot /YourPathToIoTtalk/setup/startup.sh
```
Replace _YourPathToIoTtalk_ with your path to IoTtalk 1.0. Below is an example
```
@reboot /home/iottalk/iottalk_server_1.0/setup/startup.sh
```




## Setup IoTtalk 1.0 in isolated Python environments
Use [virtualenv](https://virtualenv.pypa.io/en/stable/) in order to do so.  
The setup flow just like above. The difference is:
- Install and setup virtualenv **before** installing python packages
- Edit `setup/startup.sh` just one line to use python3 interpreter in virtualenv


To install and setup virtualenv
1. Install virtualenv : `pip3 install virtualenv` or `sudo -H pip3 install virtualenv`
2. Create new virtualenv : `virtualenv ~/iottalk-python-venv`
3. Activate the isolated enviroment : `. ~/iottalk-python-venv/bin/activate`


Now, you can install and update python3 package in isolated enviroment.  
Make sure that you install python package **without sudo**, or your python package will still be installed outside virtualenv:
```
pip3 install -r requirements.txt
pip3 install --upgrade requests
```


To make all commands both with or without `sudo` in `setup/startup.sh` use the isolated enviroment, you have to edit one line in `setup/startup.sh`.  
Change line 3 from
```
python3="python3"
```
to
```
python3="/YourPathToVirtualenv/bin/python3"
```
Replace _YourPathToVirtualenv_ with your path to virtualenv. Below is an example
```
python3="/home/iottalk/iottalk-python-venv/bin/python3"
```


Now, you can run `sudo -H ./setup/startup.sh` even without activate the virualenv.


============================================================
## Extra document for reference:
IoTtalk簡易安裝指南

環境部分：(optional)
sudo apt-get update
sudo apt-get upgrade

sudo apt-get install vim
sudo apt-get install ssh
sudo /etc/init.d/ssh  restart

========================================================

IoTtalk installation：

1. Download Python 3.6.5 into the user home directory, for example: (now the current working directory is "/home/<userID>")
        wget https://www.python.org/ftp/python/3.6.5/Python-3.6.5.tgz
        wget https://www.python.org/ftp/python/3.6.15/Python-3.6.15.tgz
   
2. Upload screen into the user home directory, then use the command below: (now the current working directory is "/home/<userID>")
        wget http://pcs.csie.nctu.edu.tw/da/screenrc
        mv screenrc .screenrc
    

3. Compile Python3.6.5 source file: (now the current working directory is "/home/<userID>")
	sudo -H apt-get install libsqlite3-dev -y
	sudo -H apt-get install libssl-dev openssl  -y
        sudo -H apt-get install zlib1g-dev -y
	tar xzvf Python-3.6.5.tgz
	cd Python-3.6.5         (now the current working directory is "/home/<userID>/Python-3.6.5")

        sudo -H apt-get install build-essential -y  (if you don't have development kits like c, c++ compiler)

	./configure --prefix=/usr/local   (--enable-shared)
	make -j 2  
	sudo make install
        cd ..

3. Install screen
	sudo apt-get install screen -y
        

4. Install IoTtalk (now the current working directory is "/home/<userID>")
        sudo apt-get install git -y  (if you don't have git)
	git clone https://gitlab.com/IoTtalk/iottalk-v1.git iottalk_server_1.0    (then enter your GitLab account/password)
	cd iottalk_server_1.0      (now the current working directory is  "/home/<userID>/iottalk_server_1.0")
	sudo pip3 install -r requirements.txt

5. Run sudo command without a password
        cd /etc/sudoers.d  
        sudo touch nopasswd4sudo  
        sudo vim nopasswd4sudo  
   press 'i'
   Type 
        <userID> ALL=(ALL) NOPASSWD : ALL  
   press ESC, then :wq!  

6. Autorun when system reboot:
        sudo vim /etc/rc.local
   add a new line with the below command:
        sudo -u <userID> /home/<userID>/iottalk_server_1.0/setup/startup.sh

7. sudo apt-get install mailutils -y

8. sudo reboot

9. Check the IoTtalk running correct or not with the below command:

        screen -ls
        
   press Cttl + left/right arrow keys can shift the terminals, then check there is no error message.

