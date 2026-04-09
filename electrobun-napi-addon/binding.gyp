{
  "targets": [
    {
      "target_name": "turbolnd_napi",
      "sources": [
        "src/addon.cc",
        "src/addon_api.cc",
        "src/method_dispatch.cc",
        "src/promise_bridges.cc",
        "src/stream_bridges.cc"
      ],
      "conditions": [
        [
          "OS==\"win\"",
          {
            "msvs_settings": {
              "VCCLCompilerTool": {
                "AdditionalOptions": [
                  "/std:c++20"
                ]
              }
            }
          }
        ],
        [
          "OS!=\"win\"",
          {
            "cflags_cc": [
              "-std=c++20"
            ]
          }
        ]
      ]
    }
  ]
}
