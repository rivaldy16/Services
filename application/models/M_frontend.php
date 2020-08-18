<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_frontend extends CI_model
{
	public function option_parent_menu()
	{
		$this->db->select('*');
		$this->db->from('menu');
		$this->db->where('parent_id','0');
		$this->db->where('status','1');
		$query = $this->db->get()->result();
		$data[0] = 'Tidak Ada';
		foreach ($query as $key => $value) {
			$data[$value->id] = $value->menu;
		}
		return $data;
	}

	public function option_sub_menu()
	{
		$this->db->select('*');
		$this->db->from('menu');
		$this->db->where('level','2');
		$this->db->where('status','1');
		$query = $this->db->get()->result();
		$data[0] = 'Tidak Ada';
		foreach ($query as $key => $value) {
			$data[$value->id] = $value->menu;
		}
		return $data;
	}

	public function insert($table,$data)
	{
		$this->db->insert($table,$data);
		return true;
	}

	public function insert_id($table,$data)
	{
		$this->db->insert($table,$data);
		return $this->db->insert_id();
	}	

	public function update($table,$where,$data)
	{
		$this->db->update($table, $data, $where);
		return $this->db->affected_rows();
		return true;
	}

	public function delete($table,$where)
	{
		$this->db->delete($table, $where);
		return true;
	}

	public function delete_data($id,$tahun,$bulan)
	{
		$this->db->where('id_ekbang_usaha', $id);
		$this->db->where('tahun', date("Y-m-d H:i:s", mktime(0,0,0,$bulan,1,$tahun)));
		$this->db->delete('ekbang_verifikasi_pedagang');
		return true;
	}

	public function getData($value='') {
		$this->db->select($value['select']);
		$this->db->from($value['table']);

		if (isset($value['where'])) {
			$this->db->where($value['where']);
		}

		if (isset($value['join'])) {
			foreach ($value['join'] as $join) {
				$this->db->join($join['0'],$join['1'],'left');
			}
		}

		if (isset($value['group'])) {
			$this->db->group_by($value['group']);
		}

		if (isset($value['limit'])) {
			$this->db->limit($value['limit']);
		}
		if (isset($value['order'])) {
			$this->db->order_by($value['order']);
		}
		
		$result = $this->db->get()->result();
		return $result;
	}

	public function getPendidikan($tahun)
	{
		$query = $this->db->query("
			SELECT pendidikan_tingkat.nama as nama, 
       			(SELECT COUNT(tingkat_pend) FROM pendidikan_pemerintah WHERE tingkat_pend = pendidikan_tingkat.nama AND tahun = '".$tahun."') AS jumlah,
       			(SELECT SUM(jumlah_kelas) FROM pendidikan_pemerintah WHERE tingkat_pend = pendidikan_tingkat.nama AND tahun = '".$tahun."') AS jumlah_kelas,
        		(SELECT (SUM(r_kelas)+SUM(r_tu)+SUM(r_kepsek)+SUM(r_guru)) FROM pendidikan_pemerintah WHERE tingkat_pend = pendidikan_tingkat.nama AND tahun = '".$tahun."') AS jumlah_lokal,
        		(SELECT SUM(jumlah_siswa) FROM pendidikan_pemerintah WHERE tingkat_pend = pendidikan_tingkat.nama AND tahun = '".$tahun."') AS jumlah_siswa,
        		(SELECT SUM(guru_laki)+SUM(guru_perempuan)+SUM(guru_tu)+SUM(guru_penjaga) FROM pendidikan_pemerintah WHERE tingkat_pend = pendidikan_tingkat.nama AND tahun = '".$tahun."') AS jumlah_guru
			FROM pendidikan_tingkat"
		);
		return $query->result();
	}

	public function getRow($value='')
	{
		$this->db->select($value['select']);
		$this->db->from($value['table']);

		if (isset($value['where'])) {
			$this->db->where($value['where']);
		}

		if (isset($value['join'])) {
			foreach ($value['join'] as $join) {
				$this->db->join($join['0'],$join['1'],'left');
			}
		}

		if (isset($value['group'])) {
			$this->db->group_by($value['group']);
		}

		if (isset($value['limit'])) {
			$this->db->limit($value['limit']);
		}
		if (isset($value['order'])) {
			$this->db->order_by($value['order']);
		}
		
		$result = $this->db->get()->row();
		return $result;
	}

	public function getID($value='')
	{
		if (isset($value['select'])) {
			$this->db->select($value['select']);
		}
		$this->db->from($value['table']);

		if (isset($value['where'])) {
			$this->db->where($value['where']);
		}

		$result = $this->db->get()->row();
		return $result;
	}

	public function getMenu()
	{
		$this->db->select('*');
		$this->db->from('menu');
		$this->db->order_by('sort','asc');
		$query = $this->db->get()->result();

		$ref   = [];
		$items = [];

		foreach ($query as $key => $data) {
			$thisRef = &$ref[$data->id];

			$thisRef['parent'] = $data->parent;
			$thisRef['menu'] = $data->menu;
			$thisRef['link'] = $data->link;
			$thisRef['id'] = $data->id;

			if($data->parent == 0) {
				$items[$data->id] = &$thisRef;
			} else {
				$ref[$data->parent]['child'][$data->id] = &$thisRef;
			}
		}
		return $items;
	}

	public function getAmil($tahun,$bulan)
	{
		$periode = date("Y-m-d H:i:s", mktime(0,0,0,$bulan,1,$tahun));
		$this->db->select('sosial_ibadah.*,YEAR(sosial_ibadah.tahun) as tahun, MONTH(sosial_ibadah.tahun) as bulan,sosial_ketua_masjid.*');
		$this->db->from('sosial_ibadah');
		$this->db->join('sosial_ketua_masjid','sosial_ketua_masjid.id_sosial_ketua_masjid = sosial_ibadah.id_sosial_ketua_masjid','right');
		$this->db->where('sosial_ibadah.tahun',$periode);
		$result = $this->db->get()->result();
		return $result;
	}

	public function get_location_data()
    {
        $this->db->select("a.id,a.location_name as text");
        $this->db->from("tb_location a");

        $query = $this->db->get();
        return $query->result();
    }

    public function get_category_data()
    {
        $this->db->select("a.id,a.category as text");
        $this->db->from("tb_categories a");
        $this->db->where('a.status', 1);

        $query = $this->db->get();
        return $query->result();
    }

    public function get_category_location()
    {
        $this->db->select("*");
        $this->db->from("tb_categories");

        $query = $this->db->get();
        return $query->result();
    }

    // public function get_datakoor($id)
    // {
    //     $this->db->select("a.id,a.id_category,a.location_name,a.longitude,a.latitude,a.description");
    //     $this->db->from("tb_location a");
    //     $this->db->where("a.id",$id);

    //     $query = $this->db->get();
    //     return $query->row();
    // }

    public function get_datakoor($id)
    {
        $this->db->select("a.id,a.id_category,a.location_name,a.longitude,a.latitude,a.description,b.category,a.image,a.file");
        $this->db->from("tb_location a");
        $this->db->join("tb_categories b", "a.id_category=b.id");
        $this->db->where("a.id_category",$id);

        $query = $this->db->get();
        return $query->result();
    }

    var $table = 'tb_location';
    var $column_order = array(null,'id','category','location_name','longitude','latitude','description','username'); 
    var $column_search = array('category','location_name','longitude','latitude','description','username'); 
    var $order = array('id' => 'desc'); // default order 

	function __construct()
    {
    	parent::__construct();
    }

    public function get_data_location_maps()
	{
        $post_input = $this->input->post();
        $this->_get_datatables_query();
        if($post_input['length'] != -1)
		{
			$this->perPage = $post_input['length'];
		}
		if (isset($post_input['start']) && $post_input['length'] != -1 ) {
			$this->db->limit(intval($post_input['length']),intval($post_input['start']));
		}
        $query = $this->db->get();
        return $query->result();
    }

    private function _get_datatables_query($filter=null)
    {
 		$this->db->select("a.id,a.location_name,b.category,a.longitude,a.latitude,a.description,c.username");
        $this->db->from("tb_location a");
        $this->db->join("tb_categories b","a.id_category = b.id");
        $this->db->join("tb_users c","a.created_by = c.id");

        $i = 0;
        foreach ($this->column_search as $item) // loop column 
        {
            if($_POST['search']['value']) // if datatable send POST for search
            {
                if($i===0) // first loop
                {
                    $this->db->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
                    $this->db->like($item, $_POST['search']['value']);
                }
                else
                {
                    $this->db->or_like($item, $_POST['search']['value']);
                }
 
                if(count($this->column_search) - 1 == $i) //last loop
                    $this->db->group_end(); //close bracket
            }
            $i++;
        }
         
        if(isset($_POST['order'])) // here order processing
        {
            $this->db->order_by($this->column_order[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
        } 
        else if(isset($this->order))
        {
            $order = $this->order;
            $this->db->order_by(key($order), $order[key($order)]);
        }
    }

    function count_filtered()
    {
        $this->_get_datatables_query();
        $query = $this->db->get();
        return $query->num_rows();
    }
 
    public function count_all()
    {
        $this->db->select("a.id");
        $this->db->from("tb_categories a");
        return $this->db->count_all_results();
    }

    public function getDataLocationMaps_()
    {
 		$this->db->select("a.id,a.location_name,b.category,a.longitude,a.latitude,a.description,c.username,a.image,a.file");
        $this->db->from("tb_location a");
        $this->db->join("tb_categories b","a.id_category = b.id");
        $this->db->join("tb_users c","a.created_by = c.id");
        $this->db->where("a.status", 1);

        $query = $this->db->get();
        return $query->result();
    }

}