<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends MX_Controller {

	public function index() 
	{
		if(!isset($_SESSION)) 
		{ 
			session_start(); 
		}

		if ($this->session->userdata('login') == 1)
		{
			redirect(site_url('beranda'));
		}

		$data['title'] = "Kranggan";
		$this->load->view('login',$data);
	}

	public function check()
	{
		$NIP 		= stripslashes(preg_replace("/[^A-Za-z0-9.@*_]/", "" ,$_POST['nip']));
		$pass		= stripslashes(preg_replace("/[^A-Za-z0-9.@*_]/", "" ,$_POST['pass']));
		$data_user['select'] 	= "*";
		$data_user['table']		= "user";
		$data_user['where']		= "NIP = '".$NIP."' and status = '1'";

		if ($NIP == "admin" && $pass == "admin") {
			$session = array('login' => true, 'time' => time(), 'id_user' => 2, 'nama_odp' => 'Sekretariat, Kranggan', 'nama' => 'Administrator', 'jenis_user' => '1');
				$this->session->set_userdata($session);
		}
		else
		{
			$this->session->set_flashdata('error_login','Username atau Password Salah!!!');
			redirect('login');
		}

		redirect(site_url('beranda'));

		// $data['user'] = $this->m_frontend->getData($data_user);
		// if ($data['user']) 
		// {
		// 	$this->curl->create('http://opendatav2.tangerangkota.go.id/services/auth/login/uid/'.$NIP.'/pid/'.$pass.'/format/json'); 

		// 	$this->curl->http_login(REST_U, REST_P);
		// 	$result = json_decode($this->curl->execute(), true);
		// 	if ($result !== NULL) 
		// 	{
		// 		$session = array('login' => true, 'time' => time(), 'id_user' => $data['user']['0']->id_user, 'nama_odp' => $data['user']['0']->nama_odp, 'nama' => $data['user'][0]->nama, 'jenis_user' => $data['user'][0]->id_user_type);
		// 		$this->session->set_userdata($session);
		// 	}
		// 	else 
		// 	{
		// 		$this->session->set_flashdata('error_login','NIP dan Password anda salah!!');
		// 		redirect('login');
		// 	}
		// 	redirect(site_url('beranda'));
		// }
		
	}

	public function logout()
	{
		$this->session->unset_userdata('time');
		$this->session->unset_userdata('login');
		$this->session->sess_destroy();
		redirect(site_url('login'));
	}
}
