baseURL=https://dash.akamaized.net/envivio/EnvivioDash3/
representationIDs=( v1_257 v2_257 v3_257 v4_257 v5_257 v6_257 v7_257 v8_257 v9_257 v4_258 )
cd dash_demo_video
for RepresentationID in "${representationIDs[@]}"
do
    mkdir "${RepresentationID}"
    cd "${RepresentationID}"
    echo "${baseURL}${RepresentationID}-Header.m4s"
    curl -O "${baseURL}${RepresentationID}-Header.m4s"
    mv "${RepresentationID}-Header.m4s" Header.m4s
    for Number in `seq 1 97`;
    do
        curl -O "${baseURL}${RepresentationID}-270146-i-$Number.m4s"
        mv "${RepresentationID}-270146-i-$Number.m4s" "$Number.m4s"
    done   
    cd ..
done