<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Indikator_kegiatan extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Indikator_kegiatan_model', 'indikator_kegiatan');
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
        
        $data = $this->indikator_kegiatan->get($start, $length, $sort, $order, $where, $like);

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

    public function get_data_indikator_post(){
        //PARAMETER
        $id_indikator_kegiatan = $this->post('id_indikator_kegiatan');
        $id_prokeg_skpd = $this->post('id_prokeg_skpd');
        $id_indikator = $this->post('id_indikator');
        $tolak_ukur = $this->post('tolak_ukur');
        $target = $this->post('target');
        $data = array();
        $where = array();
        $like = array();

        if($id_indikator_kegiatan){
            $where['t_indikator_kegiatan.id_indikator_kegiatan'] = $id_indikator_kegiatan;
        }

        if($id_prokeg_skpd){
            $where['t_indikator_kegiatan.id_prokeg_skpd'] = $id_prokeg_skpd;
        }

        if($id_indikator){
            $where['t_indikator_kegiatan.id_indikator'] = $id_indikator;
        }

        if($tolak_ukur){
            $like['t_indikator_kegiatan.tolak_ukur'] = $tolak_ukur;
        }
        
        if($target){
            $like['t_indikator_kegiatan.target'] = $target;
        }
        
        $data = $this->indikator_kegiatan->get_data_indikator($where, $like);

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

    public function sync_post(){
        $data = false;
        $data_indikator_kegiatan = array();
        $post = $this->post();

        $data_service = (Array) json_decode($post['data_service']);

        if($data_service){
            foreach($data_service as $row){
                $data_indikator =  array();
                foreach($row->indikator as $ind){
                    $id = array(
                        'Capaian Program' => '1',
                        'Masukan' => '2',
                        'Keluaran' => '3',
                        'Hasil' => '4'
                    );
                    $data_indikator[$id[$ind->indikator]][] = $ind;
                }

                $data_indikator_kegiatan[] = array(
                    'id_prokeg_skpd' => $row->id_prokeg_skpd,
                    'indikator' => $data_indikator,
                );
            }
        }

        foreach($data_indikator_kegiatan as $row){
            foreach($row['indikator'] as $k => $v){
                $indikator_kegiatan = $this->indikator_kegiatan->get_data_indikator(array(
                    't_indikator_kegiatan.id_prokeg_skpd' => $row['id_prokeg_skpd'],
                    't_indikator_kegiatan.id_indikator' => $k
                ), null);

                $id_indikator = $k;
                $tolak_ukur = '';
                $target = '';

                foreach($v as $r){
                    if($r->tolak_ukur){
                        $tolak_ukur .= $r->tolak_ukur . '</br>';
                    }

                    if($r->satuan){
                        $target .= $r->satuan . '</br>';
                    }
                }
                $tolak_ukur = substr($tolak_ukur, 0, -5);
                $target = substr($target, 0, -5);

                $value = array(
                    'id_prokeg_skpd' => $row['id_prokeg_skpd'],
                    'id_indikator' => $id_indikator,
                    'tolak_ukur' => $tolak_ukur,
                    'target' => $target,
                );

                if($indikator_kegiatan){
                    $this->indikator_kegiatan->update(array('id_indikator_kegiatan' => $indikator_kegiatan[0]->id_indikator_kegiatan), $value);
                }else{
                    $this->indikator_kegiatan->insert($value);
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
    
    public function save_post(){
        $data = null;
        $post = $this->post();

        $data_indikator_kegiatan = $this->indikator_kegiatan->get_data_indikator(array('id_indikator_kegiatan' => $post['id_indikator_kegiatan']), null);

        if($data_indikator_kegiatan){
            $data = $this->indikator_kegiatan->update(array('id_indikator_kegiatan' => $post['id_indikator_kegiatan']), $post);
            $data = $post['id_indikator_kegiatan'];
        }else{
            $data = $this->indikator_kegiatan->insert($post);
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
    
    public function del_post(){
        $data = $this->indikator_kegiatan->delete($this->post());

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

