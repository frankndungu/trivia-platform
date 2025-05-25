<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle API login request.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        // Authenticate using LoginRequest (from Breeze)
        $request->authenticate();

        $user = $request->user();

        // Create a Sanctum token
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ]);
    }

    /**
     * Handle API logout request.
     */
    public function logout(): JsonResponse
    {
        $user = auth()->user();

        // Delete current token
        $user->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful'
        ]);
    }
}
