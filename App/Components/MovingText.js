import { useEffect } from "react"
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming,Easing, cancelAnimation } from "react-native-reanimated"

export const MovingText = ({text,animatedThreshold, style})=>{
    const translateX = useSharedValue(0)
    const shouldAnimate = text?.length >= animatedThreshold

    const textWidth = text?.length * 2

    useEffect(()=>{
        if(!shouldAnimate) return

        translateX.value = withDelay(1000, withRepeat(withTiming(-textWidth,{
            duration:5000,
            easing:Easing.linear,
        }), -1, true))

        return ()=> {
            cancelAnimation(translateX)
            translateX.value = 0
        }
    },[translateX,text,animatedThreshold,shouldAnimate,textWidth])

    const animatedStyle = useAnimatedStyle(()=>{
        return{
            transform:[{translateX:translateX.value}],
        }
    })

    return(
        <Animated.Text numberOfLines={1} style={[style, animatedStyle, shouldAnimate && {
            width: 400,
            paddingLeft:16
        }]}>
             {text}
        </Animated.Text>
    )
}