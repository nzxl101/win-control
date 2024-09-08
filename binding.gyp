{
    "targets": [
        {
            "target_name": "<(module_name)",
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "sources": ["src/c++/main.cpp", "src/c++/window.cpp"],
            'msvs_settings': {
                'VCCLCompilerTool': {
                    'ObjectFile': "$(IntDir)/%(Directory)/"
                }
            },
            "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"],
            "libraries": [],
            "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS=1"]
        },
        {
            "target_name": "action_after_build",
            "type": "none",
            "dependencies": ["<(module_name)"],
            "copies": [
                {
                    "files": ["<(PRODUCT_DIR)/<(module_name).node"],
                    "destination": "<(module_path)"
                }
            ]
        }
    ]
}