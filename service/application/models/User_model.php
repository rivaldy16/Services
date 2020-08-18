<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->select('
            m_user.id_user as id_user,
            m_user.nip as nip,
            m_user.username as username,
            m_user.nama as nama,
            m_user.is_pegawai as is_pegawai,
            m_user.jumlah_login as jumlah_login,
            m_user.login_terakhir as login_terakhir,
            m_level.id_level as id_level,
            m_level.nama as level,
            m_skpd.id_skpd as id_skpd,
            m_skpd.nama_lengkap as nama_lengkap_skpd,
            m_skpd.nama_singkat as nama_singkat_skpd
        ');
        $this->db->from('m_user');
        $this->db->join('m_level', 'm_user.id_level = m_level.id_level');
        $this->db->join('m_skpd', 'm_user.id_skpd = m_skpd.id_skpd', 'LEFT');
        if($start != null && $length != null){
            $this->db->limit($length, $start);
        }
        if($sort != null && $order != null){
            $this->db->order_by($sort, $order);
        }
        if($where != null){
            $this->db->where($where);
        }
        if($like != null){
            $this->db->like($like);
        }
        $query = $this->db->get();
        return $query->result();
    }

    public function get_by_username($username){
        $this->db->select('
            m_user.id_user as id_user,
            m_user.nip as nip,
            m_user.username as username,
            m_user.nama as nama,
            m_user.is_pegawai as is_pegawai,
            m_user.jumlah_login as jumlah_login,
            m_user.login_terakhir as login_terakhir,
            m_level.id_level as id_level,
            m_level.nama as level,
            m_skpd.id_skpd as id_skpd,
            m_skpd.nama_lengkap as nama_lengkap_skpd,
            m_skpd.nama_singkat as nama_singkat_skpd
        ');
        $this->db->from('m_user');
        $this->db->join('m_level', 'm_user.id_level = m_level.id_level');
        $this->db->join('m_skpd', 'm_user.id_skpd = m_skpd.id_skpd', 'LEFT');
        $this->db->where('username', $username);
        $this->db->or_where('nip', $username);
        $query = $this->db->get();
        return $query->result();
    }

    public function insert($data) {
        $this->db->insert('m_user', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('m_user', $data, $where);
        return $this->db->affected_rows();
    }

    public function update_login($id_user) {
        $this->db->set('jumlah_login', 'jumlah_login + 1', FALSE);
        $this->db->set('login_terakhir', 'login_sekarang', FALSE);
        $this->db->set('login_sekarang', 'NOW()', FALSE);
        $this->db->where('id_user', $id_user);
        $this->db->update('m_user');
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('m_user');
        return $this->db->affected_rows();
    }
}

