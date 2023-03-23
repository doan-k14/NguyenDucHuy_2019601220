<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\OrderDetail;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('page', 1);
        $start = ($page - 1) * $pageSize;

        $orders = Order::query();

        $orders = $orders
            ->skip($start)
            ->take($pageSize)
            ->get();

        $total = $orders->count();

        return response()->json([
            'message' => 'Success',
            'result' => [
                'total' => $total,
                'orders' => $orders,
                'page' => $page,
                'pageSize' => $pageSize
            ]
        ]);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'full_name' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'quantity' => 'required',
            'total_price' => 'required',
            'status' => 'required'
        ]);

        $order = Order::create($request->input());

        return response()->json([
            'message' => 'Create success',
            'result' => $order
        ]);
    }

    public function latest(){
        $order = Order::orderby('created_at', 'desc')->first();

        return response()->json([
            'message' => 'Success',
            'result' => $order
        ]);
    }

    public function insert(Request $request)
    {
        $this->validate($request, [
            'products' => 'required|array'
        ]);

        $products = $request['products'];
        foreach($products as $product) {
            OrderDetail::create($product);
        }

        Mail::send('order-success', ['test' => 'test mail'], function($email){
            $email->to('inuyasha160201@gmail.com', 'Huy');
            $email->subject('Thông tin đơn hàng từ Elden Song');
        });

        return response()->json([
            'message' => 'Create success',
            'result' => $products
        ]);
    }

    public function show($id)
    {
        $orderDetail = OrderDetail::query()->where('order_id', $id)->get();

        return response()->json([
            'message' => 'success',
            'result' => $orderDetail
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'status' => 'required'
        ]);

        $order = Order::find($id);
        $order->fill($request->input());

        $order->save();

        return response()->json([
            'message' => 'Update success',
            'result' => $order
        ]);
    }
}
