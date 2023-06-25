```yml
      - script@1:
          inputs:
            - content: |-
                #!/usr/bin/env bash
                # fail if any commands fails
                set -e
                # make pipelines' return status equal the last command to exit with a non-zero status, or zero if all commands exit successfully
                set -o pipefail
                # debug log
                set -x

                # write your script here
                # printenv
                node --version

                # or run a script from your repository, like:
                # bash ./path/to/script.sh
                # not just bash, e.g.:
                # ruby ./path/to/script.rb
```
```yml
      - script@1:
          inputs:
            - content: |-
                #!/bin/zsh

                # Setup
                set -e
                set -o pipefail
                set -x

                # Get Latest Build Number
                INCREMENTED_BUILD_NUMBER = $(($EXTRACTED_ANDROID_VERSION_CODE+1))
                envman add --key LATEST_BUILD --value "$INCREMENTED_BUILD_NUMBER"

                # Define the file path
                file=".bitrise.test.yml"

                # Create a temporary file
                temp_file=".bitrise.secrets_temp.yml"

                # Read the first line from the original file and write it to the temporary file
                head -n 1 "$file" > "$temp_file"

                # Write the new line to the temporary file
                echo "  - LATEST_BUILD: $INCREMENTED_BUILD_NUMBER" >> "$temp_file"

                # Skip the first two lines and append the remaining lines from the original file to the temporary file
                tail -n +3 "$file" >> "$temp_file"

                # Replace the original file with the temporary file
                mv "$temp_file" "$file"

```
```yml
    - script-runner@0:
        inputs:
        - runner: zsh
        - file_path: "$WORKDIR/myscript.sh"
```
```yml
    - change-workdir@1:
        title: Switch working dir to test / _tmp dir
        run_if: true
        inputs:
        - path: ./_tmp
        - is_create_path: true
    - change-workdir@1:
        run_if: ..
    - secure-delete-path@2:
        inputs:
        - path: "./_tmp"

    - set-env-var@0:
        inputs:
        - destination_keys: "$BUILD_NUMBER $VERSION_CODE"
        - value: '1'

```

```yml
      - version-extractor-android@0: {}
      - script@1:
          inputs:
            - content: |-
                #!/usr/bin/env bash
                set -e
                set -o pipefail
                set -x

                INCREMENTED_BUILD_NUMBER = $(($EXTRACTED_ANDROID_VERSION_CODE+1))
                envman add --key NEW_BUILD_NUMBER --value "$INCREMENTED_BUILD_NUMBER"



    - version-extractor-android@0: {}
$EXTRACTED_ANDROID_VERSION_NAME
$EXTRACTED_ANDROID_VERSION_CODE
    - change-value@2:
        inputs:
        - old_value: OLD_BUILD_NUMBER
        - new_value: OLD_APP_VERSION
        - file: "$WORKDIR/.bitrise.secrets.yml"
    - change-value@2:
        inputs:
        - old_value: OLD_BUILD_NUMBER
        - new_value: OLD_APP_VERSION
        - file: "$WORKDIR/.bitrise.secrets.yml"

envman add --key MY_TEST_ENV_KEY --value 'test value for test key'
envman run bash -c 'echo "Environment test: $MY_TEST_ENV_KEY"'




  test:
    envs:
    - TEST_KEY: "test value"
    steps:
    - script:
        title: "Template test"
        inputs:
        - content: |
            #!/bin/bash
            set -v
            {{if .IsCI}}
            exit 1
            {{else}}
            exit 0
            {{end}}
          opts:
            is_template: true
    - script:
        title: "Template test"
        inputs:
        - content: |
            #!/bin/bash
            set -v
            {{if enveq "TEST_KEY" "test value"}}
            exit 0
            {{else}}
            exit 1
            {{end}}
          opts:
            is_template: true

            - script:
  title: Template example
  inputs:
  - content: |-
    {{if .IsCI}}
    echo "CI mode"
    {{else}}
    echo "not CI mode"
    {{end}}
    opts:
      is_template: true