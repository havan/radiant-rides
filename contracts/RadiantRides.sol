// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

//                              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                     ░░░░░░░░░▓████████████████████████████████████████▓░░░░░░░░░
//              ░░░░░░░░████████▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒████████▒░░░░░░░
//          ░░░░░██████▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒██████▒░░░░░
//       ░░░▓████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓████░░░░
//    ░░░▓██▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒███░░░
//  ░░░██▓░░░░░░░░█████░██▒░░░██░░█░░███▓░░██░▓███░░██░░░░███░░░████▒░█████▓░░█░███░▒████░░░░░░░▒██▒░░
// ░░██░░░░░░░░░▓██░░░░░██▒░░░██░░███░▒███░████░▓██░███░░▒██░░██░░░▒█░█░░░░██░██▒░░██░░░░░░░░░░░░░░██░░
// ░░█░░░░░░░░░░░████▒░░██░░░░██░░██░░░▒██░██░░░░██░░██░░██▓░░█▒░░░░░░░░█████░█░░░░░███░░░░░░░░░░░░░█▓░
// ░░█░░░░░░░░░░░░░░░██▒██░░░░██░░██░░░▓██░██▒░░░██░░▒██▓██░░░█▓░░░░░▓█▓░░░██░█▒░░░░░░░██▓░░░░░░░░░░█▓░
// ░░██░░░░░░░░░███████░████████▒▓██░░░███░███░░░███░░████░░░░███████▓██▓████░██░░▒███▓██▒░░░░░░░░░██░░
//  ░░░██▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░
//    ░░░███▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒███░░░
//      ░░░░▓████▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█████░░░░
//          ░░░░░▓█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██████░░░░░
//               ░░░░░░████████▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒████████░░░░░░
//                     ░░░░░░░░▓██████████████████████████████████████████▓░░░░░░░░░
//                             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//
// ### Radiant Rides: Sunny Cars 33rd Birthday Edition ###
//
// Join the celebration with "Radiant Rides," an exclusive NFT collection
// honoring Sunny Cars' 33rd birthday. This unique series features 33 identical
// yet vibrant car designs, each reflecting Sunny Cars' commitment to
// exceptional rental experiences. These NFTs have been given to Sunny Cars by
// Chain4Travel to share with their valued partners. Perfect for collectors and
// travel enthusiasts, "Radiant Rides" is a tribute to the joy of the journey
// and the thrill of exploration. Celebrate with Sunny Cars and experience the
// journey!
contract RadiantRides is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 public constant MAX_SUPPLY = 33;
    uint256 public totalMinted;
    string private _commonTokenURI;

    constructor(
        string memory name,
        string memory symbol,
        string memory commonTokenURI
    ) ERC721(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _commonTokenURI = commonTokenURI;
    }

    function mint(address to, uint256 tokenId) public onlyRole(MINTER_ROLE) {
        require(totalMinted < MAX_SUPPLY, "Max supply reached");
        _mint(to, tokenId);
        totalMinted++;
    }

    function mintAll(address to) public onlyRole(MINTER_ROLE) {
        require(totalMinted == 0, "NFTs already minted");

        for (uint256 i = 1; i <= MAX_SUPPLY; i++) {
            _mint(to, i);
            totalMinted++;
        }
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireOwned(tokenId);
        return _commonTokenURI;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
