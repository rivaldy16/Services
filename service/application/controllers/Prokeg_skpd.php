<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Prokeg_skpd extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Prokeg_skpd_model', 'prokeg_skpd');
        $this->load->model('Skpd_aktif_model', 'skpd_aktif');
        $this->load->model('Prokeg_model', 'prokeg');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_prokeg_skpd = $this->post('id_prokeg_skpd');
        $id_parent = $this->post('id_parent');
        $id_skpd = $this->post('id_skpd');
        $id_prokeg = $this->post('id_prokeg');
        $id_prokeg_jenis = $this->post('id_prokeg_jenis');
        $id_tahap = $this->post('id_tahap');
        $tahun = $this->post('tahun');
        $kode_path = $this->post('kode_path');
        $uraian = $this->post('uraian');
        $data = array();
        $where = array();
        $like = array();

        if($id_prokeg_skpd){
            $where['t_prokeg_skpd.id_prokeg_skpd'] = $id_prokeg_skpd;
        }

        if($id_parent){
            if($id_parent == "NULL"){
                $where['t_prokeg_skpd.id_parent IS NULL'] = NULL;
            }else{
                $where['t_prokeg_skpd.id_parent'] = $id_parent;
            }
        }
        
        if($id_skpd){
            $where['t_prokeg_skpd.id_skpd'] = $id_skpd;
        }
        
        if($id_prokeg){
            $where['t_prokeg_skpd.id_prokeg'] = $id_prokeg;
        }
        
        if($id_prokeg_jenis){
            $where['m_prokeg.id_prokeg_jenis'] = $id_prokeg_jenis;
        }
        
        if($id_tahap){
            $where['t_prokeg_skpd.id_tahap'] = $id_tahap;
        }
        
        if($tahun){
            $where['t_prokeg_skpd.tahun'] = $tahun;
        }
        
        if($kode_path){
            $like['t_prokeg_skpd.kode_path'] = $kode_path;
        }
        
        if($uraian){
            $like['m_prokeg.uraian'] = $uraian;
        }
        
        $data = $this->prokeg_skpd->get($start, $length, $sort, $order, $where, $like);

        if($data){
            $response['status'] = 200;
            $response['success'] = true;
            $response['message'] = 'Success';
            $response['count'] = count($data);
            $response['param'] = $this->post();
            $response['data'] = $data;
        }else{
            $response['status'] = 404;
            $response['success'] = false;
            $response['message'] = 'Failed';
            $response['count'] = 0;
            $response['param'] = null;
            $response['data'] = null;
        }

        $this->response($response);
    }
    
    public function save_post(){
        $data = null;
        $post = $this->post();

        $data_prokeg_skpd = $this->prokeg_skpd->get(null, null, null, null, array('id_prokeg_skpd' => $post['id_prokeg_skpd']), null);

        if($data_prokeg_skpd){
            $data = $this->prokeg_skpd->update(array('id_prokeg_skpd' => $post['id_prokeg_skpd']), $post);
            $data = $post['id_prokeg_skpd'];
        }else{
            $data = $this->prokeg_skpd->insert($post);
        }

        if($data){
            $response['status'] = 200;
            $response['success'] = true;
            $response['message'] = 'Success';
            $response['count'] = 1;
            $response['param'] = $this->post();
            $response['data'] = $data;
        }else{
            $response['status'] = 404;
            $response['success'] = false;
            $response['message'] = 'Failed';
            $response['count'] = 0;
            $response['param'] = null;
            $response['data'] = null;
        }

        $this->response($response);
    }

    public function sync_post(){
        $data = false;
        $post = $this->post();

        $data_service = (Array) json_decode($post['data_service']);

        $skpd_aktif = $this->skpd_aktif->get(null, null, null, null, array(
            'm_skpd.id_skpd' => $post['id_skpd'], 
            't_skpd_aktif.tahun' => $post['tahun']
        ), array());

        if($skpd_aktif){
            $data_prokeg_wajib_skpd = array();
            $kode_skpd = $skpd_aktif[0]->kode_skpd;
            $arr_kode_skpd = explode('.', $kode_skpd);

            $prokeg = $this->prokeg->get(null, null, null, null, array(
                'm_prokeg.id_tahap' => $post['id_tahap'],
                'm_prokeg.tahun' => $post['tahun'],
                'm_prokeg.kode_path' => $arr_kode_skpd[0] . '.' . $arr_kode_skpd[1] . '.' . $arr_kode_skpd[2] . '.',
            ), array());

            if($prokeg){
                $data_prokeg_wajib_skpd[$prokeg[0]->kode_path] = $prokeg[0];
                $id_parent = $prokeg[0]->id_parent;

                while($id_parent){
                    $prokeg_parent = $this->prokeg->get(null, null, null, null, array('m_prokeg.id_prokeg' => $id_parent), array());
                    $data_prokeg_wajib_skpd[$prokeg_parent[0]->kode_path] = $prokeg_parent[0];
                    $id_parent = $prokeg_parent[0]->id_parent;
                }
                ksort($data_prokeg_wajib_skpd);
            }

            foreach($data_prokeg_wajib_skpd as $row){
                $prokeg_skpd = $this->prokeg_skpd->get(null, null, null, null, array(
                    't_prokeg_skpd.id_skpd' => $skpd_aktif[0]->id_skpd,
                    't_prokeg_skpd.id_prokeg' => $row->id_prokeg,
                    't_prokeg_skpd.id_tahap' => $post['id_tahap'],
                    't_prokeg_skpd.tahun' => $post['tahun'],
                ), array());
                if(!$prokeg_skpd){
                    if($row->id_parent){
                        $prokeg_parent = $this->prokeg->get(null, null, null, null, array('m_prokeg.id_prokeg' => $row->id_parent), array());
                        if($prokeg_parent){
                            $prokeg_skpd_parent = $this->prokeg_skpd->get(null, null, null, null, array(
                                't_prokeg_skpd.id_skpd' => $skpd_aktif[0]->id_skpd,
                                't_prokeg_skpd.id_prokeg' => $prokeg_parent[0]->id_prokeg,
                                't_prokeg_skpd.id_tahap' => $post['id_tahap'],
                                't_prokeg_skpd.tahun' => $post['tahun'],
                            ), array());
                            if($prokeg_skpd_parent){
                                $value = array(
                                    'id_parent' => $prokeg_skpd_parent[0]->id_prokeg_skpd,
                                    'id_skpd' => $skpd_aktif[0]->id_skpd,
                                    'id_prokeg' => $row->id_prokeg,
                                    'id_tahap' => $post['id_tahap'],
                                    'tahun' => $post['tahun'],
                                    'kode_path' => $row->kode_path,
                                );
                                $this->prokeg_skpd->insert($value);
                            }
                        }
                    }else{
                        $value = array(
                            'id_parent' => NULL,
                            'id_skpd' => $skpd_aktif[0]->id_skpd,
                            'id_prokeg' => $row->id_prokeg,
                            'id_tahap' => $post['id_tahap'],
                            'tahun' => $post['tahun'],
                            'kode_path' => $row->kode_path,
                        );
                        $this->prokeg_skpd->insert($value);
                    }
                }
            }
        }

        foreach($data_service as $row){
            if($row->jenis == 'KEGIATAN'){
                if($row->nama_bidang == 'NON URUSAN'){
                    $data_prokeg = array();
                    $arr_kode_skpd = explode('.', $row->kode_kegiatan);
                    $kode_path_prokeg = 'x.xx.xx.xx.' . $arr_kode_skpd[7] . '.' . $arr_kode_skpd[8] . '.';

                    $prokeg = $this->prokeg->get(null, null, null, null, array(
                        'm_prokeg.id_tahap' => $post['id_tahap'],
                        'm_prokeg.tahun' => $post['tahun'],
                        'm_prokeg.kode_path' => $kode_path_prokeg,
                    ), array());

                    if($prokeg){
                        $data_prokeg[$prokeg[0]->kode_path] = $prokeg[0];
                        $id_parent = $prokeg[0]->id_parent;

                        while($id_parent){
                            $prokeg_parent = $this->prokeg->get(null, null, null, null, array('m_prokeg.id_prokeg' => $id_parent), array());
                            $data_prokeg[$prokeg_parent[0]->kode_path] = $prokeg_parent[0];
                            $id_parent = $prokeg_parent[0]->id_parent;
                        }
                        ksort($data_prokeg);
                    }

                    foreach($data_prokeg as $dp){
                        $prokeg_skpd = $this->prokeg_skpd->get(null, null, null, null, array(
                            't_prokeg_skpd.id_skpd' => $skpd_aktif[0]->id_skpd,
                            't_prokeg_skpd.id_prokeg' => $dp->id_prokeg,
                            't_prokeg_skpd.id_tahap' => $post['id_tahap'],
                            't_prokeg_skpd.tahun' => $post['tahun'],
                        ), array());
                        if(!$prokeg_skpd){
                            if($dp->id_prokeg_jenis == '5'){
                                $kode_skpd = $skpd_aktif[0]->kode_skpd;
                                $arr_kode_skpd = explode('.', $kode_skpd);

                                $prokeg_skpd_parent = $this->prokeg_skpd->get(null, null, null, null, array(
                                    't_prokeg_skpd.id_skpd' => $skpd_aktif[0]->id_skpd,
                                    't_prokeg_skpd.kode_path' => $arr_kode_skpd[0] . '.' . $arr_kode_skpd[1] . '.' . $arr_kode_skpd[2] . '.',
                                    't_prokeg_skpd.id_tahap' => $post['id_tahap'],
                                    't_prokeg_skpd.tahun' => $post['tahun'],
                                ), array());
                                if($prokeg_skpd_parent){
                                    $value = array(
                                        'id_parent' => $prokeg_skpd_parent[0]->id_prokeg_skpd,
                                        'id_skpd' => $skpd_aktif[0]->id_skpd,
                                        'id_prokeg' => $dp->id_prokeg,
                                        'id_tahap' => $post['id_tahap'],
                                        'tahun' => $post['tahun'],
                                        'kode_path' => $row->kode_program,
                                    );
                                    $this->prokeg_skpd->insert($value);
                                }
                            }else if($dp->id_prokeg_jenis == '6'){
                                $prokeg_skpd_parent = $this->prokeg_skpd->get(null, null, null, null, array(
                                    't_prokeg_skpd.id_skpd' => $skpd_aktif[0]->id_skpd,
                                    't_prokeg_skpd.kode_path' => $row->kode_program,
                                    't_prokeg_skpd.id_tahap' => $post['id_tahap'],
                                    't_prokeg_skpd.tahun' => $post['tahun'],
                                ), array());
                                if($prokeg_skpd_parent){
                                    $value = array(
                                        'id_parent' => $prokeg_skpd_parent[0]->id_prokeg_skpd,
                                        'id_skpd' => $skpd_aktif[0]->id_skpd,
                                        'id_prokeg' => $dp->id_prokeg,
                                        'id_tahap' => $post['id_tahap'],
                                        'tahun' => $post['tahun'],
                                        'kode_path' => $row->kode_kegiatan,
                                    );
                                    $this->prokeg_skpd->insert($value);
                                }
                            }
                        }
                    }
                }else{
                    $data_prokeg = array();
                    $arr_kode_path = explode('.', $row->kode_kegiatan);
                    $kode_path_prokeg = $arr_kode_path[0] . '.' . $arr_kode_path[1] . '.' . $arr_kode_path[2] . '.xx.' . $arr_kode_path[7] . '.' . $arr_kode_path[8] . '.';

                    $prokeg = $this->prokeg->get(null, null, null, null, array(
                        'm_prokeg.id_tahap' => $post['id_tahap'],
                        'm_prokeg.tahun' => $post['tahun'],
                        'm_prokeg.kode_path' => $kode_path_prokeg,
                    ), array());

                    if($prokeg){
                        $prokeg[0]->kode_path_parent = $arr_kode_path[0] . '.' . $arr_kode_path[1] . '.' . $arr_kode_path[2] . '.xx.' . $arr_kode_path[7] . '.';
                        $data_prokeg[$prokeg[0]->kode_path] = $prokeg[0];

                        $id_parent = $prokeg[0]->id_parent;

                        while($id_parent){
                            $kode_path_parent = '';

                            $prokeg_parent = $this->prokeg->get(null, null, null, null, array('m_prokeg.id_prokeg' => $id_parent), array());
                            $prokeg_grandparent = $this->prokeg->get(null, null, null, null, array('m_prokeg.id_prokeg' => $prokeg_parent[0]->id_parent), array());
                            if($prokeg_grandparent){
                                $kode_path_parent = $prokeg_grandparent[0]->kode_path;
                            }

                            $prokeg_parent[0]->kode_path_parent = $kode_path_parent;
                            $data_prokeg[$prokeg_parent[0]->kode_path] = $prokeg_parent[0];

                            $id_parent = $prokeg_parent[0]->id_parent;
                        }
                        ksort($data_prokeg);
                    }

                    foreach($data_prokeg as $dp){
                        $prokeg_skpd = $this->prokeg_skpd->get(null, null, null, null, array(
                            't_prokeg_skpd.id_skpd' => $skpd_aktif[0]->id_skpd,
                            't_prokeg_skpd.id_prokeg' => $dp->id_prokeg,
                            't_prokeg_skpd.id_tahap' => $post['id_tahap'],
                            't_prokeg_skpd.tahun' => $post['tahun'],
                        ), array());
                        if(!$prokeg_skpd){
                            if(!$dp->id_parent){
                                $value = array(
                                    'id_parent' => NULL,
                                    'id_skpd' => $skpd_aktif[0]->id_skpd,
                                    'id_prokeg' => $dp->id_prokeg,
                                    'id_tahap' => $post['id_tahap'],
                                    'tahun' => $post['tahun'],
                                    'kode_path' => $dp->kode_path,
                                );
                                $this->prokeg_skpd->insert($value);
                            }else{
                                $prokeg_parent = $this->prokeg->get(null, null, null, null, array(
                                    'm_prokeg.id_tahap' => $post['id_tahap'],
                                    'm_prokeg.tahun' => $post['tahun'],
                                    'm_prokeg.kode_path' => $data_prokeg[$dp->kode_path_parent]->kode_path,
                                ), array());
                                if($prokeg_parent){
                                    $prokeg_skpd_parent = $this->prokeg_skpd->get(null, null, null, null, array(
                                        't_prokeg_skpd.id_skpd' => $skpd_aktif[0]->id_skpd,
                                        't_prokeg_skpd.id_prokeg' => $prokeg_parent[0]->id_prokeg,
                                        't_prokeg_skpd.id_tahap' => $post['id_tahap'],
                                        't_prokeg_skpd.tahun' => $post['tahun'],
                                    ), array());
                                    if($prokeg_skpd_parent){
                                        if(strpos($dp->kode_path, 'x')){
                                            $dp->kode_path = str_replace('xx', $skpd_aktif[0]->kode_skpd, $dp->kode_path);
                                        }
                                        $value = array(
                                            'id_parent' => $prokeg_skpd_parent[0]->id_prokeg_skpd,
                                            'id_skpd' => $skpd_aktif[0]->id_skpd,
                                            'id_prokeg' => $dp->id_prokeg,
                                            'id_tahap' => $post['id_tahap'],
                                            'tahun' => $post['tahun'],
                                            'kode_path' => $dp->kode_path,
                                        );
                                        $this->prokeg_skpd->insert($value);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        unset($post['data_service']);

        $response['status'] = 200;
        $response['success'] = true;
        $response['message'] = 'Success';
        $response['count'] = 1;
        $response['param'] = $post;
        $response['data'] = $data;

        $this->response($response);
    }
    
    public function del_post(){
        $data = $this->prokeg_skpd->delete($this->post());

        if($data){
            $response['status'] = 200;
            $response['success'] = true;
            $response['message'] = 'Success';
            $response['count'] = 1;
            $response['param'] = $this->post();
            $response['data'] = $data . ' data is deleted';
        }else{
            $response['status'] = 404;
            $response['success'] = false;
            $response['message'] = 'Failed';
            $response['count'] = 0;
            $response['param'] = null;
            $response['data'] = null;
        }

        $this->response($response);
    }
}

