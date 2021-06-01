using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace testProject
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void DummyTest()
        {
            bool b = false;
            if (true)
            {
                b = true;
            }
            Assert.IsTrue(b);
        }
    }
}
