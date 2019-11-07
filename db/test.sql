
<<LOOP
    TYPE ('1', '2', '3')
    PARENT ('4', '5', '6')
>>

    -- <<LOOP CHILD ('7', '8', '9')>>

    --     TYPE: <<TYPE>> PARENT: <<PARENT>> CHILD: <<CHILD>>

    --     <<ONLY CHILD ('7')>>
    --         SEVEN: <<CHILD>>
    --     <<END ONLY>>

    -- <<END LOOP>>

    <<ONLY PARENT ('5', '6')>>

        OUTER ONLY <<PARENT>> <<TYPE>>

        <<ONLY TYPE ('2')>>

            INNER ONLY <<PARENT>> <<TYPE>>

        <<END ONLY>>
    <<END ONLY>>

<<END LOOP>>
