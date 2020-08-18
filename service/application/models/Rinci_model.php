<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rinci_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->select('
            t_rinci.id_rinci as id_rinci,
            t_rinci.id_parent as id_parent,
            t_rinci.id_prokeg_skpd as id_prokeg_skpd,
            m_akun.id_akun as id_akun,
            m_akun.uraian as uraian_akun,
            m_akun.kode as kode_akun,
            m_akun.kode_path as kode_path_akun,
            m_akun_jenis.id_akun_jenis as id_akun_jenis,
            m_akun_jenis.uraian as uraian_akun_jenis
        ');
        $this->db->from('t_rinci');
        $this->db->join('m_akun', 't_rinci.id_akun = m_akun.id_akun');
        $this->db->join('m_akun_jenis', 'm_akun.id_akun_jenis = m_akun_jenis.id_akun_jenis');

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
        $this->db->insert('t_rinci', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('t_rinci', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('t_rinci');
        return $this->db->affected_rows();
    }
}
