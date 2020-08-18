<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_user extends CI_model
{
	var $table = 'user';
	var $column_order = array(null, 'nama','nama_odp');
	var $column_search = array('nama','nama_odp'); 
	var $order = array('id_user' => 'desc');

	public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

	private function _get_datatables_query($type=null,$id=null)
    {         
        switch ($type) {
            case 'user':
            case 'user_del':
                $this->db->select('*');
                $this->db->from('user');
                break;

            case 'data_ktda':
            case 'del_data_ktda':
                $this->db->select('d.*, k.judul as nama_ktda, k.files as file_ktda');
                $this->db->from('data_ktda as d');
                $this->db->join('ktda as k','k.id = d.ktda_id');
                $this->db->where_in('ktda_id',$user_akses_ktda);
                break;
            
            default:
                # code...
                break;
        }
 
        $i = 0;
     
        foreach ($this->column_search as $item) // loop column 
        {
            if (isset($_POST['search'])) {
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
        }
        
        if (!isset($order_req)) {
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
    }
 
    function get_datatables($type=null,$id=null)
    {
        $this->_get_datatables_query($type);

        switch ($type) {
            case 'user':
                $this->db->where('status',1);
                break;
            case 'user_del':
                $this->db->where('status',0);
                break;
            case 'sub_ktda':
                $this->db->where('parent_id != 0');
                $this->db->where('status',1);
                if (isset($id)) {
                    $this->db->where('parent_id',$id);
                }
                break;
            case 'del_sub_ktda':
                $this->db->where('parent_id != 0');
                $this->db->where('status',0);
                if (isset($id)) {
                    $this->db->where('parent_id',$id);
                }
                break;
            case 'data_ktda':
                $this->db->where('d.status',1);
                break;
            case 'del_data_ktda':
                $this->db->where('d.status',0);
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
            case 'user':
                $this->db->where('status',1);
                break;
            case 'user_del':
                $this->db->where('status',0);
                break;
            case 'sub_ktda':
                $this->db->where('parent_id != 0');
                $this->db->where('status',1);
                if (isset($id)) {
                    $this->db->where('parent_id',$id);
                }
                break;
            case 'del_sub_ktda':
                $this->db->where('parent_id != 0');
                $this->db->where('status',0);
                if (isset($id)) {
                    $this->db->where('parent_id',$id);
                }
                break;
            case 'data_ktda':
                $this->db->where('d.status',1);
                break;
            case 'del_data_ktda':
                $this->db->where('d.status',0);
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
            case 'user':
                $this->db->where('status',1);
                break;
            case 'user_del':
                $this->db->where('status',0);
                break;
            case 'sub_ktda':
                $this->db->where('parent_id != 0');
                $this->db->where('status',1);
                if (isset($id)) {
                    $this->db->where('parent_id',$id);
                }
                break;
            case 'del_sub_ktda':
                $this->db->where('parent_id != 0');
                $this->db->where('status',0);
                if (isset($id)) {
                    $this->db->where('parent_id',$id);
                }
                break;
            case 'data_ktda':
                $this->db->where('d.status',1);
                break;
            case 'del_data_ktda':
                $this->db->where('d.status',0);
                break;
            
            default:
                # code...
                break;
        }

        return $this->db->count_all_results();
    }
}
