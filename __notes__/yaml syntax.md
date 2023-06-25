## Block Quotes

'|' puts on separte lines, '>' converts newlines to spaces.

```yml
include_newlines: |
            exactly as you see
            will appear these three
            lines of poetry

fold_newlines: >
            this is really a
            single line of text
            despite appearances
```

## Variables
foo: "{{ variable }}"


### Gotchyas
- ":" + space ==> causes interpretation, so needs to be in quotes if text
- ":something_immedately" ==> is fine
- version: "1.0" ==> quotes are needed to avoid it being read as a floating poing number