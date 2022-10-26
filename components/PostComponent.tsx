import React from "react";
import { Pressable, StyleSheet } from "react-native";
import colors from "../constants/colors";
import PostItem from "./PostItem";

const PostComponent = (props: any) => {
    const { onPress, title } = props
    return (
        <Pressable
            style={styles.itemStyle}
            onPress={onPress}
        >
            <PostItem description={title} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemStyle: {
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
    }
})

export default PostComponent
