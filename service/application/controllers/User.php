<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class User extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('User_model', 'user');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_user = $this->post('id_user');
        $nip = $this->post('nip');
        $username = $this->post('username');
        $password = $this->post('password');
        $nama = $this->post('nama');
        $id_level = $this->post('id_level');
        $is_pegawai = $this->post('is_pegawai');
        $id_skpd = $this->post('id_skpd');
        $jumlah_login = $this->post('jumlah_login');
        $login_sekarang = $this->post('login_sekarang');
        $login_terakhir = $this->post('login_terakhir');
        $create_date = $this->post('create_date');
        $create_by = $this->post('create_by');
        $last_edit_date = $this->post('last_edit_date');
        $last_edit_by = $this->post('last_edit_by');

        $data = array();
        $where = array();
        $like = array();

        if($id_user){
            $where['m_user.id_user'] = $id_user;
        }

        if($nip){
            $where['m_user.nip'] = $nip;
        }

        if($id_level){
            $where['m_user.id_level'] = $id_level;
        }

        if($is_pegawai){
            $where['m_user.is_pegawai'] = $is_pegawai;
        }

        if($id_skpd){
            $where['m_user.id_skpd'] = $id_skpd;
        }

        if($jumlah_login){
            $where['m_user.jumlah_login'] = $jumlah_login;
        }

        if($login_sekarang){
            $where['m_user.login_sekarang'] = $login_sekarang;
        }

        if($login_terakhir){
            $where['m_user.login_terakhir'] = $login_terakhir;
        }

        if($create_date){
            $where['m_user.create_date'] = $create_date;
        }

        if($create_by){
            $where['m_user.create_by'] = $create_by;
        }

        if($last_edit_date){
            $where['m_user.last_edit_date'] = $last_edit_date;
        }

        if($last_edit_by){
            $where['m_user.last_edit_by'] = $last_edit_by;
        }

        if($nama){
            $like['m_user.nama'] = $nama;
        }

        if($username){
            $like['m_user.username'] = $username;
        }

        $data = $this->user->get($start, $length, $sort, $order, $where, $like);

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

    public function get_data_by_username_post(){
        //PARAMETER
        $username = $this->post('username');

        $data = array();

        $data = $this->user->get_by_username($username);

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

        $data_user = $this->user->get(null, null, null, null, array('id_user' => $post['id_user']), null);

        if($data_user){
            $data = $this->user->update(array('id_user' => $post['id_user']), $post);
            $data = $post['id_user'];
        }else{
            $data = $this->user->insert($post);
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

    public function update_login_post(){
        $data = null;
        $id_user = $this->post('id_user');

        $data = $this->user->update_login($id_user);
        $data = $id_user;

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
        $data = $this->user->delete($this->post());

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

