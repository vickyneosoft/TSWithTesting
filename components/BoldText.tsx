import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native'

type BoldTextProps = {
    style?: TextStyle
    children: string
}

const BoldText = (props: BoldTextProps) => {
    const mergedStyle = useMemo(() => StyleSheet.compose(styles.container, props.style as TextStyle), [props])

    return (
        <Text style={mergedStyle}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 14,
        fontWeight: "bold"
    }
})

export default BoldText
