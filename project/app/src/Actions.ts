export interface IGenericActionHandler {
  /**
   * Enable or disable a block
   * @param args.device the device for which this triggers #device:{"filter":"driver_id=generic-block"}
   * @param args.enabled enable or disable the block #dropdown:{"enable":"Enable", "disable":"Disable"}
   * @param args.updateOnlyIfChanged Update the device only if the value has changed #dropdown:{"always":"Update always", "changed":"Update if changed"}
   * @param args.refreshScreen Refresh the screen after the device has updated #dropdown:{"always":"Refresh always", "no":"Manual refresh"}
   */
  EnableBlock(args: {
    device: any;
    enabled: string;
    updateOnlyIfChanged: string;
    refreshScreen: string;
  }): Promise<boolean>;
  /**
   * Refresh the screen the block is on
   * @param args.device the device for which this triggers #device:{"filter":"driver_id=generic-block"}
   */
  Refresh(args: { device: any }): Promise<boolean>;
}

export interface ITextActionHandler {
  /**
   * Enable or disable a block
   * @param args.device the device for which this triggers #device:{"filter":"driver_id=text-block"}
   * @param args.enabled enable or disable the block #dropdown:{"enable":"Enable", "disable":"Disable"}
   * @param args.updateOnlyIfChanged Update the device only if the value has changed #dropdown:{"always":"Update always", "changed":"Update if changed"}
   * @param args.refreshScreen Refresh the screen after the device has updated #dropdown:{"always":"Refresh always", "no":"Manual refresh"}
   */
  EnableBlock(args: {
    device: any;
    enabled: string;
    updateOnlyIfChanged: string;
    refreshScreen: string;
  }): Promise<boolean>;
  /**
   * Refresh the screen the block is on
   * @param args.device the device for which this triggers #device:{"filter":"driver_id=text-block"}
   */
  Refresh(args: { device: any }): Promise<boolean>;
  /**
   * Update the text of a text block
   * @param args.device the device for which this triggers #device:{"filter":"driver_id=text-block"}
   * @param args.text The text to set #sample:Hello World
   * @param args.updateOnlyIfChanged Update the device only if the value has changed #dropdown:{"always":"Update always", "changed":"Update if changed"}
   * @param args.refreshScreen Refresh the screen after the device has updated #dropdown:{"always":"Refresh always", "no":"Manual refresh"}
   */
  SetText(args: { device: any; text: string; updateOnlyIfChanged: string; refreshScreen: string }): Promise<boolean>;
}
