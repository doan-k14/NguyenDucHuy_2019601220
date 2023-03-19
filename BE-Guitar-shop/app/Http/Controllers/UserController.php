<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $total = Users::all()->count();
        $users = Users::all();

        return response()->json([
            'message' => 'Success',
            'result' => [
                'total' => $total,
                'users' => $users
            ]
        ]);
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required|min:6',
            'full_name' => 'required',
            'email' => 'required|email'
        ]);

        $user = Users::create($request->input());

        return response()->json([
            'message' => 'Register success',
            'result' => $user
        ]);
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required|min:6'
        ]);

        $user = Users::query()->where([
            'username' => $request['username'],
            'password' => $request['password']
        ])->get();

        if (count($user) === 0)
            $message = 'Username or password is incorrect!';
        else
            $message = 'Login successfully!';

        return response()->json([
            'message' => $message,
            'result' => $user
        ]);
    }

    public function changePassword(Request $request)
    {
        $user = Users::query()->where('username', $request['username'])->firstOrFail();
        if ($user->password !== $request['old_password'])
            return response()->json([
                'errors' => 'Mật khẩu không đúng',
                'success' => false,
                'message' => 'Input error',
            ], 400);

        $user->password = $request->input('new_password');

        $user->save();

        return response()->json([
            'message' => 'Change password success',
            'result' => $user
        ]);
    }

    public function show($id)
    {
        $user = Users::find($id);

        if (!$user)
            $message = "Cannot find username by id:$id!";
        else
            $message = 'Success!';

        return response()->json([
            'message' => $message,
            'result' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required|min:6'
        ]);

        $user = Users::find($id);
        $user->fill($request->input());

        $user->save();

        return response()->json([
            'message' => 'Update success',
            'result' => $user
        ]);
    }
}
