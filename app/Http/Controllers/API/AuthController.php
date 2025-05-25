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
     * PURE API - No sessions, returns JSON only
     */
    public function login(LoginRequest $request): JsonResponse
    {
        // AUTHENTICATE USER
        $request->authenticate();
        
        // GET AUTHENTICATED USER
        $user = $request->user();
        
        // OPTIONAL: Create Sanctum token for stateless API
        // $token = $user->createToken('api-token')->plainTextToken;
        
        // RETURN JSON RESPONSE
        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                // 'token' => $token, // Uncomment if using tokens
            ]
        ]);
    }

    /**
     * Handle API logout request.
     * PURE API - No sessions needed
     */
    public function logout(): JsonResponse
    {
        // If using Sanctum tokens
        // auth()->user()->currentAccessToken()->delete();
        
        // If using session-based (though not recommended for API)
        Auth::logout();
        
        return response()->json([
            'success' => true,
            'message' => 'Logout successful'
        ]);
    }
}