<?php

namespace Modules\Test\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class demoController extends Controller
{
	/**
	 * Show the form for editing the specified resource.
	 * @return Responses
	 */
	public function index()
	{
		return view('test::demo');
	}
}