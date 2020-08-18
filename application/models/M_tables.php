<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_tables extends CI_model
{

	var $column_order_rtrw     = array(null, 'jumlah_rt','jumlah_rw','tahun');
	var $column_search_rtrw    = array('jumlah_rt','jumlah_rw','tahun'); 
	var $order_rtrw            = array('id' => 'asc');

    var $column_order_wilayah     = array(null, 'jumlah_rt','jumlah_rw','tahun');
    var $column_search_wilayah    = array('jumlah_rt','jumlah_rw','tahun'); 
    var $order_wilayah            = array('id' => 'asc');

    var $column_order_geografi     = array(null, 'ketinggian','curah_hujan','topografi','suhu','tahun');
    var $column_search_geografi    = array('ketinggian','curah_hujan','topografi','suhu','tahun'); 
    var $order_geografi            = array('id' => 'asc'); 

    var $column_order_orbitasi     = array(null, 'jarak_kec','jarak_kota','jarak_provinsi','jarak_ibukota','tahun');
    var $column_search_orbitasi    = array('jarak_kec','jarak_kota','jarak_provinsi','jarak_ibukota','tahun'); 
    var $order_orbitasi            = array('id' => 'asc'); 

    var $column_order      = array(null, 'tahun');
    var $column_search     = array('tahun'); 
    var $order             = array('id' => 'asc');
    var $order_peristiwa    = array('id_pemerintahan_peristiwa' => 'asc');

	public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

	private function _get_datatables_query($type=null,$id=null)
    {         
        switch ($type) {
            case 'rtrw':
            case 'rtrw_del':
                $this->db->select('*');
                $this->db->from('umum_rt_rw');
            break;

            case 'wilayah':
            case 'wilayah_del':
                $this->db->select('*');
                $this->db->from('umum_wilayah');
            break;

            case 'geografis':
            case 'geografis_del':
                $this->db->select('*');
                $this->db->from('umum_geografis');
            break;

            case 'orbitasi':
            case 'orbitasi_del':
                $this->db->select('*');
                $this->db->from('umum_orbitasi');
            break;

            case 'saranaibadah':
            case 'saranaibadah_del':
                  $this->db->select('sum(masjid) as jml_masjid, sum(musholla) as jml_musholla, sum(gereja) as jml_gereja, sum(pura) as jml_pura, sum(vihara) as jml_vihara, tahun,status');
                  $this->db->from('keagamaan_sarana');
                  $this->db->group_by('tahun'); 
            break;

            case 'pemelukagama':
            case 'pemelukagama_del':
                  $this->db->select('sum(islam) as jml_islam, sum(protestan) as jml_protestan, sum(katolik) as jml_katolik, sum(hindu) as jml_hindu, sum(budha) as jml_budha, sum(kepercayaan) as jml_kepercayaan,  YEAR(tahun) as tahun , MONTH(tahun) as bulan,status');
                  $this->db->from('keagamaan_pemeluk');
                  $this->db->group_by('tahun'); 
            break;
            case 'puskesmas':
            case 'puskesmas_del':
                  $this->db->select('sum(jumlah_kunjungan) as jumlah_kunjungan, sum(jumlah_tenaga) as jumlah_tenaga, YEAR(tahun) as tahun, MONTH(tahun) as bulan,status');
                  $this->db->from('kesehatan_puskesmas');
                  $this->db->group_by('tahun'); 
            break;

            case 'posyandu':
            case 'posyandu_del':
                  $this->db->select('count(posyandu) as jumlah_posyandu, sum(jumlah_pengurus) as jumlah_pengurus, sum(jumlah_pelayanan) as jumlah_pelayanan, tahun,status');
                  $this->db->from('kesehatan_posyandu');
                  $this->db->group_by('tahun'); 
            break;

            case 'pelayanan':
            case 'pelayanan_del':
                  $this->db->select('count(nama_posyandu) as jumlah_posyandu, tahun,status');
                  $this->db->from('kesehatan_pelayanan');
                  $this->db->group_by('tahun'); 
            break;

            case 'kesehatan_swasta':
            case 'kesehatan_swasta_del':
                  $this->db->select('sum(rumah_sakit) as rumah_sakit, sum(poli_klinik) as poli_klinik, sum(bp) as bp, sum(lab_kesehatan) as lab_kesehatan, sum(praktek_dokter) as praktek_dokter, sum(apotek) as apotek, sum(toko_obat) as toko_obat, YEAR(tahun) as tahun, MONTH(tahun) as bulan,status');
                  $this->db->from('kesehatan_swasta');
                  $this->db->group_by('tahun'); 
            break;
            case 'pendidikan_pemerintah':
            case 'pendidikan_pemerintah_del':
                  $this->db->select('count(tingkat_pend) as jumlah, YEAR(tahun) as tahun, MONTH(tahun) as bulan,status');
                  $this->db->from('pendidikan_pemerintah');
                  $this->db->group_by('tahun'); 
            break;
            case 'kemasy':
            case 'kemasy_del':
                  $this->db->select('(SUM(lpm) + sum(bkm) + sum(karang_taruna) + sum(rw) + sum(rt)) as jumlah, YEAR(tahun) as tahun, MONTH(tahun) as bulan,status,id_sosial_lembaga as id');
                  $this->db->from('sosial_lembaga');
                  $this->db->group_by('tahun'); 
            break;
            case 'pkk':
            case 'pkk_del':
                    $this->db->select('anggota as jumlah, YEAR(tahun) as tahun, MONTH(tahun) as bulan,status,id_sosial_pkk as id');
                    $this->db->from('sosial_pkk');
            break;

            case 'amil':
            case 'amil_del':
                    $this->db->select('(sum(amil_laki) + sum(amil_perempuan)) as jumlah_amil, (sum(ngaji_laki) + sum(ngaji_perempuan)) as jumlah_ngaji, (sum(marbot_laki) + sum(marbot_perempuan)) as jumlah_marbot, YEAR(tahun) as tahun, MONTH(tahun) as bulan, status');
                    $this->db->from('sosial_ibadah');
                    $this->db->group_by('tahun');
            break;

            case 'tanah':
            case 'tanah_del':
                    $this->db->select('count(lokasi) as jumlah_aset, tahun, status');
                    $this->db->from('aset_tanah');
                    $this->db->group_by('tahun');
            break;

            case 'bangunan':
            case 'bangunan_del':
                    $this->db->select('count(jenis_bangunan) as jumlah_aset, tahun, status');
                    $this->db->from('aset_bangunan');
                    $this->db->group_by('tahun');
            break;

            case 'ekonomi':
            case 'ekonomi_del':
                    $this->db->select('(sum(industri_besar) + sum(industri_menengah) + sum(industri_kecil) + sum(home_industri) + sum(pasar) + sum(kios) + sum(toko) + sum(mini_market) + sum(super_market) + sum(mall)) as jumlah_usaha, year(tahun) as tahun, MONTH(tahun) as bulan, status');
                    $this->db->from('ekbang_ekonomi');
                    $this->db->group_by('tahun');
            break;

            case 'verifikasi':
            case 'verifikasi_del':
                $this->db->select('sum(jumlah) as jumlah_total, year(tahun) as tahun, MONTH(tahun) as bulan, status');
                $this->db->from('ekbang_verifikasi_pedagang');
                $this->db->where('id_ekbang_usaha',$id);
                $this->db->group_by('tahun');
                break;

            case 'jalan':
            case 'jalan_del':
                $this->db->select('sum(panjang_jalan) as panjang_jalan, year(tahun) as tahun, MONTH(tahun) as bulan, status');
                $this->db->from('pembangunan_jalan');
                $this->db->group_by('tahun');
                break;

            case 'saluran':
            case 'saluran_del':
                $this->db->select('sum(panjang_saluran) as panjang_saluran, year(tahun) as tahun, MONTH(tahun) as bulan, status');
                $this->db->from('pembangunan_saluran');
                $this->db->group_by('tahun');
                break;

            case 'data_rumah':
            case 'data_rumah_del':
                $this->db->select('(sum(jumlah_rumah)+sum(jumlah_kontrakan)+sum(jumlah_tiga_lima)) as jumlah_total, tahun, status');
                $this->db->from('pembangunan_data_rumah');
                $this->db->group_by('tahun');
                break;

            case 'data_tps':
            case 'data_tps_del':
                $this->db->select('count(lokasi_tps) as jumlah_total, tahun, status');
                $this->db->from('pembangunan_tps');
                $this->db->group_by('tahun');
                break;

            case 'peristiwa':
            case 'peristiwa_del':
                $this->db->select('sum(akumulasi_pemerintahan_peristiwa) as jumlah_akumulasi, year(tahun) as tahun, MONTH(tahun) as bulan, status');
                $this->db->from('pemerintahan_peristiwa');
                $this->db->group_by('tahun');
            break;

            default:
                # code...
                break;
        }
 
        $i = 0;
        
        switch ($type) {
            case 'rtrw':
            case 'rtrw_del':
                foreach ($this->column_search_rtrw as $item)
                {
                    if (isset($_POST['search'])) {
                        if($_POST['search']['value'])
                        {                     
                            if($i===0)
                            {
                                $this->db->group_start();
                                $this->db->like($item, $_POST['search']['value']);
                            }
                            else
                            {
                                $this->db->or_like($item, $_POST['search']['value']);
                            }
             
                            if(count($this->column_search_rtrw) - 1 == $i)
                                $this->db->group_end();
                        }
                        $i++;
                    }
                }

                if (!isset($order_req)) {
                    if(isset($_POST['order']))
                    {
                        $this->db->order_by($this->column_order_rtrw[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
                    } 
                    else if(isset($this->order_rtrw))
                    {
                        $order = $this->order_rtrw;
                        $this->db->order_by(key($order), $order[key($order)]);
                    }
                }
            break;
            case 'wilayah':
            case 'wilayah_del':
                foreach ($this->column_search_wilayah as $item)
                {
                    if (isset($_POST['search'])) {
                        if($_POST['search']['value'])
                        {                     
                            if($i===0)
                            {
                                $this->db->group_start();
                                $this->db->like($item, $_POST['search']['value']);
                            }
                            else
                            {
                                $this->db->or_like($item, $_POST['search']['value']);
                            }
             
                            if(count($this->column_search_wilayah) - 1 == $i)
                                $this->db->group_end();
                        }
                        $i++;
                    }
                }

                if (!isset($order_req)) {
                    if(isset($_POST['order']))
                    {
                        $this->db->order_by($this->column_order_wilayah[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
                    } 
                    else if(isset($this->order_wilayah))
                    {
                        $order = $this->order_wilayah;
                        $this->db->order_by(key($order), $order[key($order)]);
                    }
                }
            break;

            case 'geografis':
            case 'geografis_del':
                foreach ($this->column_search_geografi as $item)
                {
                    if (isset($_POST['search'])) {
                        if($_POST['search']['value'])
                        {                     
                            if($i===0)
                            {
                                $this->db->group_start();
                                $this->db->like($item, $_POST['search']['value']);
                            }
                            else
                            {
                                $this->db->or_like($item, $_POST['search']['value']);
                            }
             
                            if(count($this->column_search_geografi) - 1 == $i)
                                $this->db->group_end();
                        }
                        $i++;
                    }
                }

                if (!isset($order_req)) {
                    if(isset($_POST['order']))
                    {
                        $this->db->order_by($this->column_order_geografi[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
                    } 
                    else if(isset($this->order_geografi))
                    {
                        $order = $this->order_geografi;
                        $this->db->order_by(key($order), $order[key($order)]);
                    }
                }
            break;

            case 'orbitasi':
            case 'orbitasi_del':
                foreach ($this->column_search_orbitasi as $item)
                {
                    if (isset($_POST['search'])) {
                        if($_POST['search']['value'])
                        {                     
                            if($i===0)
                            {
                                $this->db->group_start();
                                $this->db->like($item, $_POST['search']['value']);
                            }
                            else
                            {
                                $this->db->or_like($item, $_POST['search']['value']);
                            }
             
                            if(count($this->column_search_orbitasi) - 1 == $i)
                                $this->db->group_end();
                        }
                        $i++;
                    }
                }

                if (!isset($order_req)) {
                    if(isset($_POST['order']))
                    {
                        $this->db->order_by($this->column_order_orbitasi[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
                    } 
                    else if(isset($this->order_orbitasi))
                    {
                        $order = $this->order_orbitasi;
                        $this->db->order_by(key($order), $order[key($order)]);
                    }
                }
            break;

            case 'saranaibadah':
            case 'saranaibadah_del':
            case 'pemelukagama':
            case 'pemelukagama_del':
            case 'puskesmas':
            case 'puskesmas_del':
            case 'posyandu':
            case 'posyandu_del':
            case 'pelayanan':
            case 'pelayanan_del':
            case 'kesehatan_swasta':
            case 'kesehatan_swasta_del':
            case 'pendidikan_pemerintah':
            case 'pendidikan_pemerintah_del':
            case 'kemasy':
            case 'kemasy_del':
            case 'pkk':
            case 'pkk_del':
            case 'amil':
            case 'amil_del':
            case 'tanah':
            case 'tanah_del':
            case 'bangunan':
            case 'bangunan_del':
            case 'ekonomi':
            case 'ekonomi_del':
            case 'verifikasi':
            case 'verifikasi_del':
            case 'jalan':
            case 'jalan_del':
            case 'saluran':
            case 'saluran_del':
            case 'data_rumah':
            case 'data_rumah_del':
            case 'data_tps':
            case 'data_tps_del':
                foreach ($this->column_search as $item)
                {
                    if (isset($_POST['search'])) {
                        if($_POST['search']['value'])
                        {                     
                            if($i===0)
                            {
                                $this->db->group_start();
                                $this->db->like($item, $_POST['search']['value']);
                            }
                            else
                            {
                                $this->db->or_like($item, $_POST['search']['value']);
                            }
             
                            if(count($this->column_search) - 1 == $i)
                                $this->db->group_end();
                        }
                        $i++;
                    }
                }
            break;
            
            default:
                foreach ($this->column_search as $item)
                {
                    if (isset($_POST['search'])) {
                        if($_POST['search']['value'])
                        {                     
                            if($i===0)
                            {
                                $this->db->group_start();
                                $this->db->like($item, $_POST['search']['value']);
                            }
                            else
                            {
                                $this->db->or_like($item, $_POST['search']['value']);
                            }
             
                            if(count($this->column_search) - 1 == $i)
                                $this->db->group_end();
                        }
                        $i++;
                    }
                }
                if (!isset($order_req)) {
                    if(isset($_POST['order']))
                    {
                        $this->db->order_by($this->column_order[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
                    } 
                    else if(isset($this->order_peristiwa))
                    {
                        $order = $this->order_peristiwa;
                        $this->db->order_by(key($order), $order[key($order)]);
                    }
                }
            break;
        }
        
      
    }
 
    function get_datatables($type=null,$id=null)
    {
        if(isset($id))
        {
            $this->_get_datatables_query($type,$id);
        }
        else
        {
            $this->_get_datatables_query($type);
        }

        switch ($type) {
            case 'rtrw':
            case 'wilayah':
            case 'geografis':
            case 'orbitasi':
            case 'saranaibadah':
            case 'pemelukagama':
            case 'puskesmas':
            case 'posyandu':
            case 'pelayanan':
            case 'kesehatan_swasta':
            case 'pendidikan_pemerintah':
            case 'kemasy':
            case 'pkk':
            case 'amil':
            case 'tanah':
            case 'bangunan':
            case 'ekonomi':
            case 'verifikasi':
            case 'jalan':
            case 'saluran':
            case 'data_rumah':
            case 'data_tps':
            case 'peristiwa':
                $this->db->where('status',1);
                break;
            case 'rtrw_del':
            case 'wilayah_del':
            case 'geografis_del':
            case 'orbitasi_del':
            case 'saranaibadah_del':
            case 'pemelukagama_del':
            case 'puskesmas_del':
            case 'posyandu_del':
            case 'pelayanan_del':     
            case 'kesehatan_swasta_del':
            case 'pendidikan_pemerintah_del':
            case 'kemasy_del':
            case 'pkk_del':
            case 'amil_del':
            case 'tanah_del':
            case 'bangunan_del':
            case 'ekonomi_del':
            case 'verifikasi_del':
            case 'jalan_del':
            case 'saluran_del':
            case 'data_rumah_del':
            case 'data_tps_del':
            case 'peristiwa_del':
               $this->db->where('status',0);
                break;
            
            default:
                # code...
                break;
        }

        if($_POST['length'] != -1){
        	$this->db->limit($_POST['length'], $_POST['start']);
        }
        $query = $this->db->get();
        return $query->result();
    }
 
    function count_filtered($type=null,$id=null)
    {
        $this->_get_datatables_query($type);

        switch ($type) {
            case 'rtrw':
            case 'wilayah':
            case 'geografis':
            case 'orbitasi':
            case 'saranaibadah':
            case 'pemelukagama':
            case 'puskesmas':
            case 'posyandu':
            case 'pelayanan':
            case 'kesehatan_swasta':
            case 'pendidikan_pemerintah':
            case 'kemasy':
            case 'pkk':
            case 'amil':
            case 'tanah':
            case 'bangunan':
            case 'ekonomi':
            case 'verifikasi':
            case 'jalan':
            case 'saluran':
            case 'data_rumah':
            case 'data_tps':
            case 'peristiwa':
                $this->db->where('status',1);
                break;
            case 'amil_del':
            case 'rtrw_del':
            case 'wilayah_del':
            case 'geografis_del':
            case 'orbitasi_del':
            case 'saranaibadah_del':
            case 'pemelukagama_del':
            case 'puskesmas_del':
            case 'posyandu_del':
            case 'pelayanan_del':     
            case 'kesehatan_swasta_del':
            case 'pendidikan_pemerintah_del':
            case 'kemasy_del':
            case 'pkk_del':
            case 'tanah_del':
            case 'bangunan_del':
            case 'ekonomi_del':
            case 'verifikasi_del':
            case 'jalan_del':
            case 'saluran_del':
            case 'data_rumah_del':
            case 'data_tps_del':
            case 'peristiwa_del':
               $this->db->where('status',0);
                break;
            
            default:
                # code...
                break;
        }

        $query = $this->db->get();
        return $query->num_rows();
    }
 
    public function count_all($type=null,$id=null)
    {
        $this->_get_datatables_query($type);

        switch ($type) {
            case 'rtrw':
            case 'wilayah':
            case 'geografis':
            case 'orbitasi':
            case 'saranaibadah':
            case 'pemelukagama':
            case 'puskesmas':
            case 'posyandu':
            case 'pelayanan':
            case 'kesehatan_swasta':
            case 'pendidikan_pemerintah':
            case 'kemasy':
            case 'pkk':
            case 'amil':
            case 'tanah':
            case 'bangunan':
            case 'ekonomi':
            case 'verifikasi':
            case 'jalan':
            case 'saluran':
            case 'data_rumah':
            case 'data_tps':
            case 'peristiwa':
                $this->db->where('status',1);
                break;

            case 'rtrw_del':
            case 'wilayah_del':
            case 'geografis_del':
            case 'orbitasi_del':
            case 'saranaibadah_del':
            case 'pemelukagama_del':
            case 'puskesmas_del':
            case 'posyandu_del':
            case 'pelayanan_del':     
            case 'kesehatan_swasta_del':
            case 'pendidikan_pemerintah_del':
            case 'kemasy_del':
            case 'pkk_del':
            case 'amil_del':
            case 'tanah_del':
            case 'bangunan_del':
            case 'ekonomi_del':
            case 'verifikasi_del':
            case 'jalan_del':
            case 'saluran_del':
            case 'data_rumah_del':
            case 'data_tps_del':
            case 'peristiwa_del':
               $this->db->where('status',0);
                break;
            
            default:
                # code...
                break;
        }

        return $this->db->count_all_results();
    }
}
