export interface StoreState {
  components: Map<string, Component>
}

export interface Component {
  id: string,
}