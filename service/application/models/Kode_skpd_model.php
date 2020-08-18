<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kode_skpd_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->from('m_kode_skpd');
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

    public function insert($data) {
        $this->db->insert('m_kode_skpd', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('m_kode_skpd', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('m_kode_skpd');
        return $this->db->affected_rows();
    }
}
