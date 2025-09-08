from mcp.server import FastMCP
from app.services.mcp_tools import mcp
import asyncio

async def main():
    """Run the MCP server"""
    await mcp.run_stdio_async()

if __name__ == "__main__":
    asyncio.run(main())
