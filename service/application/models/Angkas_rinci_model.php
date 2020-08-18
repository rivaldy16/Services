<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Angkas_rinci_model extends CI_Model {

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
            m_akun_jenis.uraian as uraian_akun_jenis,
            t_angkas_rinci.id_angkas_rinci as id_angkas_rinci,
            t_angkas_rinci.jumlah_01 as jumlah_01,
            t_angkas_rinci.jumlah_02 as jumlah_02,
            t_angkas_rinci.jumlah_03 as jumlah_03,
            t_angkas_rinci.jumlah_04 as jumlah_04,
            t_angkas_rinci.jumlah_05 as jumlah_05,
            t_angkas_rinci.jumlah_06 as jumlah_06,
            t_angkas_rinci.jumlah_07 as jumlah_07,
            t_angkas_rinci.jumlah_08 as jumlah_08,
            t_angkas_rinci.jumlah_09 as jumlah_09,
            t_angkas_rinci.jumlah_10 as jumlah_10,
            t_angkas_rinci.jumlah_11 as jumlah_11,
            t_angkas_rinci.jumlah_12 as jumlah_12
        ');
        $this->db->from('t_rinci');
        $this->db->join('m_akun', 't_rinci.id_akun = m_akun.id_akun');
        $this->db->join('m_akun_jenis', 'm_akun.id_akun_jenis = m_akun_jenis.id_akun_jenis');
        $this->db->join('t_angkas_rinci', 't_rinci.id_rinci = t_angkas_rinci.id_rinci', 'LEFT');

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
        $this->db->insert('t_angkas_rinci', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('t_angkas_rinci', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('t_angkas_rinci');
        return $this->db->affected_rows();
    }
}
