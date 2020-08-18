<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Akun_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->select('
            m_akun.id_akun as id_akun,
            m_akun.id_parent as id_parent,
            m_akun.id_akun_jenis as id_akun_jenis,
            m_akun.id_tahap as id_tahap,
            m_akun.uraian as uraian,
            m_akun.kode as kode,
            m_akun.kode_path as kode_path,
            m_akun.tahun as tahun,
            m_akun_jenis.id_parent as id_parent_akun_jenis,
            m_akun_jenis.uraian as uraian_akun_jenis,
            m_tahap.tahap as tahap,
            m_tahap.uraian as uraian_tahap
        ');
        $this->db->from('m_akun');
        $this->db->join('m_akun_jenis', 'm_akun.id_akun_jenis = m_akun_jenis.id_akun_jenis');
        $this->db->join('m_tahap', 'm_akun.id_tahap = m_tahap.id_tahap');
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
        $this->db->insert('m_akun', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('m_akun', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('m_akun');
        return $this->db->affected_rows();
    }
}
