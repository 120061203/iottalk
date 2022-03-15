import json
import csmapi

restore_only_Remote_control = True

if __name__ == '__main__':
    try:
        ss = open('csm_state_snapshot', 'r')
        print('\nCSM state timestamp: {}'.format(ss.readline()))
        csm_state_str = ss.readline()
        ss.close()
    except Exception as e:
        print('CSM state snapshot is not existed. Pass.')
        exit()
        
    csm_state_str = csm_state_str.replace("'",'"')
    csm_state_str = csm_state_str.replace('None', '""')
    csm_state_str = csm_state_str.replace('True', '1')
    csm_state_str = csm_state_str.replace('False', '0')
    csm = json.loads(csm_state_str)

    if restore_only_Remote_control: print('Restore Remote_control only.')
    else: print('Restore CSM state.')

    for  d_id in csm.keys():
        if csm[d_id]['profile']['is_sim']: continue 
        if restore_only_Remote_control:
            if csm[d_id]['profile']['dm_name'] != 'Remote_control': continue

        for df in csm[d_id]['profile']['df_list']:
            try:
                if csm[d_id][df] != []:
                    csmapi.push(d_id, df, [csm[d_id][df][0][1][0]])
                    print('Push: {}, {}, {}, {}'.format(d_id, csm[d_id]['profile']['d_name'], df, csm[d_id][df][0][1][0]))
            except Exception as e:                
                print('Error: {}'.format(e))

'''
import time, requests
import ec_config
def periodically_store_CSM_state(): # Periodically stores CSM state...
    snapshot_period = 60
    print('\nStarting to periodically store CSM state every {} seconds.'.format(snapshot_period))
    snapshot_session = requests.Session()
    while 1:
        r = snapshot_session.get(
            'http://127.0.0.1:{}/csm_snapshot'.format(ec_config.CSM_PORT),
            timeout=10,
            headers = {'password-key': None}
        )

        if r.status_code != 200: print(r.text)
        time.sleep(snapshot_period)
'''        
