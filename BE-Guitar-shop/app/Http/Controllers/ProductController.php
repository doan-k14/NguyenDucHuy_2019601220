<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 8);
        $page = $request->input('page', 1);
        $start = ($page - 1) * $pageSize;

        $products = Product::query();

        if ($request->has('categoryID') && $request['categoryID'] !== -1)
            $products = $products->where('category_id', $request['categoryID']);
        if ($request->has('name')) {
            $products = $products->where(function ($products) use ($request) {
                $products->where('name', 'like', '%' . $request['name'] . '%')
                    ->orWhere('brand', 'like', '%' . $request['name'] . '%');
            });
        }
        if ($request->has('status') && $request['status'] !== -1)
            $products = $products->where('status', $request['status']);

        $sort_field = $request->input('sortField', 'created_at');
        $sort_order = $request->input('sortOrder', 'desc');
        $products = $products->orderBy($sort_field, $sort_order);

        $total = $products->count();

        $products = $products
            ->skip($start)
            ->take($pageSize)
            ->get();

        return response()->json([
            'message' => 'Success',
            'result' => [
                'total' => $total,
                'products' => $products,
                'page' => $page,
                'pageSize' => $pageSize
            ]
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'category_id' => 'required',
            'name' => 'required',
            'image' => 'required',
            'price' => 'required',
            'amount' => 'required',
            'status' => 'required|boolean'
        ]);

        $product = Product::create($request->input());

        return response()->json([
            'message' => 'Add success',
            'result' => $product
        ]);
    }

    public function show($id)
    {
        $product = Product::find($id);

        return response()->json([
            'message' => 'Success',
            'result' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'category_id' => 'numeric',
            'status' => 'boolean|numeric'
        ]);

        $product = Product::find($id);
        $product->fill($request->input());

        $product->save();

        return response()->json([
            'message' => 'Update success',
            'result' => $product
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();

        return response()->json([
            'message' => 'Delete success',
            'result' => $product
        ]);
    }
}
