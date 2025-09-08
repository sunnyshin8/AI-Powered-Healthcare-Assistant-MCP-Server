#!/usr/bin/env python3
"""
MCP Client Test Script for Healthcare AI Assistant
Tests connection to MCP server with OAuth authentication
"""

import requests
import base64
import json
from urllib.parse import urlencode
import time

# Configuration from provided credentials
CONFIG = {
    'api_key': 'TPA320sidXP1Hat8RAtYQrkoEotIES',
    'mcp_endpoint': 'https://ztaip-yuuhba1h-4xp4r634bq-uc.a.run.app/mcp',
    'sse_endpoint': 'https://ztaip-yuuhba1h-4xp4r634bq-uc.a.run.app/sse',
    'production_url': 'https://healthcare-mcp.fly.dev',
    'descope_client_id': 'UDMxeUpUaDdKYlRNZmtBZWZiZXFtQk53cDk3cjpUUEEzMjBzaWRYUDFIYXQ4UkF0WVFya29Fb3RJRVM=',
    'descope_client_secret': 'zShhelO1pYz5ryfkS76BVTtBo4dUUHuyaHpQ1yMANia',
    'auth_url': 'https://api.descope.com/oauth2/v1/apps/authorize',
    'login_flow': 'https://api.descope.com/login/P31yJTh7JbTMfkAefbeqmBNwp97r?flow=inbound-apps-user-consent'
}

def test_basic_connection(url):
    """Test basic connection to MCP endpoint"""
    print(f"\n🔍 Testing basic connection to: {url}")
    try:
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        if response.text:
            print(f"Response: {response.text[:500]}...")
        return response
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return None

def test_with_api_key(url, api_key):
    """Test connection with API key authentication"""
    print(f"\n🔑 Testing with API key authentication...")
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")
        return response
    except Exception as e:
        print(f"❌ API key auth failed: {e}")
        return None

def test_with_basic_auth(url, client_id, client_secret):
    """Test connection with Basic authentication"""
    print(f"\n🔐 Testing with Basic authentication...")
    # Decode base64 client_id if needed
    try:
        decoded_client_id = base64.b64decode(client_id).decode('utf-8')
        print(f"Decoded Client ID: {decoded_client_id}")
    except:
        decoded_client_id = client_id
    
    auth = requests.auth.HTTPBasicAuth(decoded_client_id, client_secret)
    try:
        response = requests.get(url, auth=auth, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")
        return response
    except Exception as e:
        print(f"❌ Basic auth failed: {e}")
        return None

def test_mcp_capabilities(url, headers=None):
    """Test MCP capabilities endpoint"""
    print(f"\n🛠️ Testing MCP capabilities...")
    capabilities_url = f"{url}/capabilities" if not url.endswith('/capabilities') else url
    try:
        response = requests.get(capabilities_url, headers=headers, timeout=10)
        print(f"Capabilities Status: {response.status_code}")
        if response.status_code == 200:
            capabilities = response.json()
            print(f"Available tools: {json.dumps(capabilities, indent=2)}")
        else:
            print(f"Response: {response.text}")
        return response
    except Exception as e:
        print(f"❌ Capabilities test failed: {e}")
        return None

def test_mcp_tools_list(url, headers=None):
    """Test MCP tools list endpoint"""
    print(f"\n📋 Testing MCP tools list...")
    tools_url = f"{url}/tools" if not url.endswith('/tools') else url
    try:
        response = requests.get(tools_url, headers=headers, timeout=10)
        print(f"Tools Status: {response.status_code}")
        if response.status_code == 200:
            tools = response.json()
            print(f"Available tools: {json.dumps(tools, indent=2)}")
        else:
            print(f"Response: {response.text}")
        return response
    except Exception as e:
        print(f"❌ Tools list test failed: {e}")
        return None

def main():
    """Main test function"""
    print("🏥 Healthcare MCP Server Connection Test")
    print("=" * 50)
    
    # Test endpoints
    endpoints = [
        CONFIG['mcp_endpoint'],
        CONFIG['sse_endpoint']
    ]
    
    for endpoint in endpoints:
        print(f"\n🌐 Testing endpoint: {endpoint}")
        print("-" * 40)
        
        # Test 1: Basic connection
        basic_response = test_basic_connection(endpoint)
        
        # Test 2: API Key authentication
        api_key_response = test_with_api_key(endpoint, CONFIG['api_key'])
        
        # Test 3: Basic auth with Descope credentials
        basic_auth_response = test_with_basic_auth(
            endpoint, 
            CONFIG['descope_client_id'], 
            CONFIG['descope_client_secret']
        )
        
        # If any auth method worked, test MCP capabilities
        successful_response = None
        headers = None
        
        if api_key_response and api_key_response.status_code < 400:
            successful_response = api_key_response
            headers = {'Authorization': f'Bearer {CONFIG["api_key"]}'}
        elif basic_auth_response and basic_auth_response.status_code < 400:
            successful_response = basic_auth_response
            auth_header = base64.b64encode(
                f"{CONFIG['descope_client_id']}:{CONFIG['descope_client_secret']}".encode()
            ).decode()
            headers = {'Authorization': f'Basic {auth_header}'}
        
        if successful_response:
            print(f"\n✅ Authentication successful!")
            # Test MCP-specific endpoints
            test_mcp_capabilities(endpoint, headers)
            test_mcp_tools_list(endpoint, headers)
        else:
            print(f"\n❌ All authentication methods failed for {endpoint}")
    
    print(f"\n🔗 OAuth Login URL: {CONFIG['login_flow']}")
    print("Use this URL for manual OAuth authentication if needed.")

if __name__ == "__main__":
    main()
