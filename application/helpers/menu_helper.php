<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

function get_menu($items,$class = 'dd-list') 
{
	$html = "<ol class=\"".$class."\" id=\"menu-id\">";
	foreach($items as $key=>$value) {
		$html.= '<li class="dd-item dd3-item" data-id="'.$value['id'].'" >
		<div class="dd-handle dd3-handle">Drag</div>
		<div class="dd3-content"><span id="label_show'.$value['id'].'">'.$value['menu'].'</span> 
		<span class="span-right">/<span id="link_show'.$value['id'].'">'.$value['link'].'</span> &nbsp;&nbsp; 
		<a href="javascript:void(0);" title="Ubah Menu" onclick="edit_menu('.$value['id'].')"><i class="icon-pencil" style="font-size: 12px;"></i></a>
		<a href="javascript:void(0);" title="Hapus Menu" onclick="hapus_menu('.$value['id'].')"><i class="icon-eraser" style="font-size: 12px;"></i></a></span> 
		</div>';
		if(array_key_exists('child',$value)) {
			$html .= get_menu($value['child'],'child');
		}
		$html .= "</li>";
	}
	$html .= "</ol>";

	return $html;
}

function front_menu($items,$class = '')
{
	$html ='';
	foreach($items as $key=>$value) {
		$html.= '
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="javascript:void(0);" id="'.$value['link'].'" onclick="home(this.id)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					'.$value['menu'].'
				</a>
		';
		if(array_key_exists('child',$value)) {
			$html .= sub_menu($value['child'],'child');
		}
		$html .= "</li>";
	}
	return $html;
}

function sub_menu($items,$class = '')
{
	$html ='<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">';
	foreach($items as $key=>$value) {
		$html.= '
			<li class="dropdown-submenu">
				<a class="dropdown-item dropdown-toggle" id="'.$value['link'].'" onclick="home(this.id)" href="javascript:void(0);">'.$value['menu'].'</a>
		';
		if(array_key_exists('child',$value)) {
			$html .= sub_menu($value['child'],'child');
		}
		$html .= "</li>";
	}
	$html .= "</ul>";
	return $html;
}

function get_kategori($items,$class = 'dd-list')
{
	$html = "";
	foreach($items as $key=>$value) {
		$html.= '
			<option value="'.$value['id'].'">
				'.$value['menu'].'
			';
		if(array_key_exists('child',$value)) {
			$html .= get_kategori($value['child'],'child');
		}
		$html .= "</option>";
	}
	$html .= "";

	return $html;
}

function parseJsonArray($jsonArray, $parentID = 0) 
{
	$return = array();
	foreach ($jsonArray as $subArray) {
		$returnSubSubArray = array();
		if (isset($subArray->children)) {
			$returnSubSubArray = parseJsonArray($subArray->children, $subArray->id);
		}

		$return[] = array('id' => $subArray->id, 'parentID' => $parentID);
		$return = array_merge($return, $returnSubSubArray);
	}
	return $return;
}
?>