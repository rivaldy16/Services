<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class App extends REST_Controller {

    public function __construct(){
        parent::__construct();
    }

    public function index_get(){
        $data = array(
            'kode_skpd' => array(
                'get_data' => array(
                    'url' => site_url('kode_skpd/get_data'),
                    'method' => 'POST',
                    'param' => array(
                        'start' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'length' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'sort' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'order' => array(
                            'type' => 'enum(asc,desc)',
                            'not null' => false
                        ),
                        'id_kode_skpd' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'kode_skpd' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                    )
                ),
                'save' => array(
                    'url' => site_url('kode_skpd/save'),
                    'method' => 'PUT',
                    'param' => array(
                        'id_kode_skpd' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'kode_skpd' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                    )
                ),
                'del' => array(
                    'url' => site_url('kode_skpd/del'),
                    'method' => 'DELETE',
                    'param' => array(
                        'id_kode_skpd' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                    )
                ),
            ),
            'unor' => array(
                'get_data' => array(
                    'url' => site_url('unor/get_data'),
                    'method' => 'POST',
                    'param' => array(
                        'start' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'length' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'sort' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'order' => array(
                            'type' => 'enum(asc,desc)',
                            'not null' => false
                        ),
                        'id_unor' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'kode_unor' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                    )
                ),
                'save' => array(
                    'url' => site_url('unor/save'),
                    'method' => 'PUT',
                    'param' => array(
                        'id_unor' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'id_unor_lama' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'kode_unor' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                    )
                ),
                'del' => array(
                    'url' => site_url('unor/del'),
                    'method' => 'DELETE',
                    'param' => array(
                        'id_unor' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                    )
                ),
            ),
            'skpd' => array(
                'get_data' => array(
                    'url' => site_url('skpd/get_data'),
                    'method' => 'POST',
                    'param' => array(
                        'start' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'length' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'sort' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'order' => array(
                            'type' => 'enum(asc,desc)',
                            'not null' => false
                        ),
                        'id_skpd' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'nama_lengkap' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'nama_singkat' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                    )
                ),
                'save' => array(
                    'url' => site_url('skpd/save'),
                    'method' => 'PUT',
                    'param' => array(
                        'id_skpd' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'nama_lengkap' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'nama_singkat' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                    )
                ),
                'del' => array(
                    'url' => site_url('skpd/del'),
                    'method' => 'DELETE',
                    'param' => array(
                        'id_skpd' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                    )
                ),
            ),
            'skpd_aktif' => array(
                'get_data' => array(
                    'url' => site_url('skpd_aktif/get_data'),
                    'method' => 'POST',
                    'param' => array(
                        'start' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'length' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'sort' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'order' => array(
                            'type' => 'enum(asc,desc)',
                            'not null' => false
                        ),
                        'id_skpd_aktif' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'kode_skpd' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'nama_lengkap_skpd' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'nama_singkat_skpd' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'kode_unor' => array(
                            'type' => 'string(255)',
                            'not null' => false
                        ),
                        'tahun' => array(
                            'type' => 'int(4)',
                            'not null' => false
                        ),
                    )
                ),
                'save' => array(
                    'url' => site_url('skpd_aktif/save'),
                    'method' => 'PUT',
                    'param' => array(
                        'id_skpd_aktif' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'id_kode_skpd' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'id_skpd' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'id_unor' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                        'tahun' => array(
                            'type' => 'int(4)',
                            'not null' => false
                        ),
                    )
                ),
                'del' => array(
                    'url' => site_url('skpd_aktif/del'),
                    'method' => 'DELETE',
                    'param' => array(
                        'id_skpd_aktif' => array(
                            'type' => 'int(11)',
                            'not null' => false
                        ),
                    )
                ),
            ),
        );

        $response['list_service'] = $data;

        $this->response($response);
    }
}
