import React from 'react';
import renderer, { act, ReactTestInstance, ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer'
import PostsScreen from '../../../screens/PostsScreen';

const navigation = {
    navigate: (screenName: string, params: any) => { }
}

var screen: ReactTestRenderer, tree: ReactTestRendererJSON | ReactTestRendererJSON[] | null

describe('<PostsScreen /> rendering', () => {
    it('PostsScreen screen renders correctly', async () => {
        await act(async () => {
            screen = await renderer.create(
                <PostsScreen navigation={navigation} />
            )
        })
        tree = screen.toJSON();
        expect(tree).toMatchSnapshot();
    });
});