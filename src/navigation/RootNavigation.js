import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./StackNavigation";
import { TabsNavigation } from "./TabsNavigation";
import { useSelector } from "react-redux";
import { ActivityLoand } from "../screen/util/ActivityLoand";

export const RootNavigation = () => {


    const { token } = useSelector(state => state.profile);
    // console.log(token);
    return (
        <NavigationContainer>
            {(token) ? <TabsNavigation /> : <StackNavigation />}
        </NavigationContainer>
    )
}