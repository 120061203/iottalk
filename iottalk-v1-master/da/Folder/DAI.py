import time, DAN, requests, random

ServerIP = '140.113.199.199' #Change to your IoTtalk IP or None for autoSearching
Reg_addr=None # if None, Reg_addr = MAC address

DAN.profile['dm_name']='Dummy_Device'
DAN.profile['df_list']=['Dummy_Sensor', 'Dummy_Control']
DAN.profile['d_name']= None # None for autoNaming
DAN.device_registration_with_retry(ServerIP, Reg_addr)

while True:
    try:
        #Pull data from a device feature called "Dummy_Control"
        value1=DAN.pull('Dummy_Control')
        if value1 != None:
            print (value1[0])

        #Push data to a device feature called "Dummy_Sensor"
        value2=random.uniform(1, 10)
        DAN.push ('Dummy_Sensor', value2)

    except requests.exceptions.ConnectionError:
        print("requests.exceptions.ConnectionError")
        DAN.device_registration_with_retry(ServerIP, Reg_addr)

    time.sleep(1)
