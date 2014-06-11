<?php
/**
 * @author calmsen 
 */
class XslxToJson {
    private $_xslxPath;
    private $_json;
    
    function __construct($_xslxPath) {
        $this->_xslxPath = $_xslxPath;
    }

    public function convert() {
        $sxe = new SimpleXMLElement($this->_xslxPath, null, true);
        $cellEls = $sxe->xpath("//gnm:Cell");
        $rows = [];
        foreach($cellEls as $cellEl) {
            if (!isset($rows[$cellEl["Row"] . ""])) {
                $rows[$cellEl["Row"] . ""] = array();
            }
            $rows[$cellEl["Row"] . ""][$cellEl["Col"] . ""] = $cellEl . "";
        }
        return json_encode($rows);
    }
}
