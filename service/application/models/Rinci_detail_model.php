<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rinci_detail_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null, $having = null){
        $this->db->select('
            *,
            (volume * harga_satuan) as jumlah
        ');
        $this->db->from('t_rinci_detail');

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
        if($having != null){
            $this->db->having($having);
        }
        $query = $this->db->get();
        return $query->result();
    }

    public function insert($data) {
        $this->db->insert('t_rinci_detail', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('t_rinci_detail', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('t_rinci_detail');
        return $this->db->affected_rows();
    }
}
