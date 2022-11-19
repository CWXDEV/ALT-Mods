using BepInEx;

namespace itemValueMod
{
    [BepInPlugin("com.KcY.SeeItemValue", "KcY-SeeItemValue", "1.4.9")]
    public class Plugin : BaseUnityPlugin
    {
        private void Awake()
        {
            new ItemPatch().Enable();
            new AmmoPatch().Enable();
            new GrenadePatch().Enable();
            new SecureContainerPatch().Enable();
        }
    }
}
